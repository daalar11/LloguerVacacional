package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.*;
import cat.iesmanacor.backend_private.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.*;

@Controller
@RequestMapping("/views/propietats")
public class PropietatController {

    @Autowired
    private iCaracteristicaService caracteristicaService;
    @Autowired
    private iPropietatService propietatService;
    @Autowired
    private iLocalitatService localitatService;
    @Autowired
    private iPropietariService propietariService;

    @ModelAttribute
    public void addAttributes(Model model, HttpSession httpSession) {
        if (httpSession.getAttribute("usuari") != null){
            Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            model.addAttribute("idUsuari", propietari.getId());
        }
    }

    //Metode controlador que retorna una llista de les propietats per mostrarles a la dataTable.
    @GetMapping({"/{Id}"})
    public String llistarPropietats (@PathVariable("Id") Long id, Model model, HttpSession httpSession){
        List <Propietat> llistaPropietats;
        if(httpSession.getAttribute("rol").equals("propietari")){
            Propietari propietari;
            propietari= propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            llistaPropietats = propietatService.findByPropietari( propietari);
            model.addAttribute("id",propietari.getId());
            if(!propietari.getId().equals(id)){
                return "/views/errorAutenticacio";
            }
        }else {
            llistaPropietats = propietatService.listarTodos();
        }
        model.addAttribute("titolLlistarPropietats", "Llista de propietats");
        model.addAttribute("propietats", llistaPropietats);

        return "/views/propietats/mostrarPropietats";
    }

    //Metode controlador de configurar una propietat. Et retorna totes les dades relacionades amb la propietat.
    @GetMapping("/configurar/{idPROPIETAT}")
    public String configuracio(@RequestParam(name="respostaBloqueig", required = false) Integer respostaBloqueig,
                               @RequestParam(name="respostaTarifa", required = false) Integer respostaTarifa,
                               @RequestParam(name="idConflictiu", required = false) Integer idConflictiu,
                               @ModelAttribute("idUsuari") Long idUsuari, Model model,
                               @PathVariable("idPROPIETAT") Long idPROPIETAT){

        //Models que envien els titols de cada Tab.
        model.addAttribute("titolEditarPropietat","Totes les dades de la propietat, tambè pots modificar les dades");
        model.addAttribute("titolEditarHabitacions","Habitacions de la propietat");
        model.addAttribute("titolTarifes","Tarifes aplicades a la tarifació de la propietat");
        model.addAttribute("titolCaracteristiques", "Configuració de les caracteristiques");
        model.addAttribute("titolBloqueig", "Configuració dels dies de bloqueig");
        model.addAttribute("titolReserves", "Reserves de la propietat");
        model.addAttribute("titolPolitiques", "Politiques de cancelacio aplicades a les reserves d'aquesta propietat");
        model.addAttribute("titolFotos", "Configuracions sobre les fotos de la propietat");

        //Codi Habitacions
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        if(!Objects.equals(propietat.getPropietari().getId(), idUsuari)){
            return "/views/errorAutenticacio";
        }
        List<Habitacio> llistaHabitacions = new ArrayList<>(propietat.getHabitacions());
        model.addAttribute("habitacions",llistaHabitacions);
        model.addAttribute("propietat",propietat);

        //Codi Localitat
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();
        model.addAttribute("localitats", listLocalitats);

        //Codi Tarifes
        List<Tarifa> llistaTarifes = new ArrayList<>(propietat.getTarifes());
        model.addAttribute("tarifes",llistaTarifes);

        //Codi Caracteristiques
        List<Caracteristica> llistaCar = caracteristicaService.findAll();
        model.addAttribute("idPropietat",idPROPIETAT);
        model.addAttribute("caracteristiques",llistaCar);
        List<Caracteristica>prova = propietat.getCaracteristicas();

        List<CaracteristicaDTO> llistaDTO = new ArrayList<>();
        for (Caracteristica caracteristica : llistaCar) {
            boolean isThere = false;
            for (Caracteristica provum : prova) {
                if (caracteristica.getIdCaracteristica().equals(provum.getIdCaracteristica())) {
                    llistaDTO.add(new CaracteristicaDTO(caracteristica, true));
                    isThere = true;
                }
            }
            if (!isThere) {
                llistaDTO.add(new CaracteristicaDTO(caracteristica, false));
            }
        }
        model.addAttribute("caracteristiquesProp",llistaDTO);

        //Codi Bloqueig
        List<Bloqueig> llistaBloqueig = new ArrayList<>(propietat.getBloqueig());
        model.addAttribute("bloqueig", llistaBloqueig);

        //Codi Reserves
        List<Reserva> llistaReserves = new ArrayList<>(propietat.getReserves());
        model.addAttribute("reserves", llistaReserves);

        //Listar politicas de cancelacio
        List<PoliticaCancelacio> politiques = new ArrayList<>(propietat.getPolitica());
        model.addAttribute("politiques",politiques);

        model.addAttribute("id", idUsuari);

        //Per saber el numero de fitxers que hi ha dins un directory
        String path = "/Media/"+ idPROPIETAT + "-media/img/";
        File subcarpeta = new File(path);

        if (subcarpeta.exists()) {

            int numeroFitxers = Objects.requireNonNull(subcarpeta.list()).length;
            model.addAttribute("numeroFotosSecundaries", numeroFitxers);

        } else {
            model.addAttribute("numeroFotosSecundaries", 0);
        }

        if (respostaTarifa != null) {
            //Per saber si una tarifa s'ha aceptat o no s'ha pogut introduir
            if (respostaTarifa == 0) {
                model.addAttribute("respostaTarifa", "No s'ha pogut introduir la tarifa \nComprova que les dates siguin valides");
            } else if (respostaTarifa == 1) {
                model.addAttribute("respostaTarifa", "Dates valides \nS'ha introduit la nova tarifa");
            }
        }
        if (respostaBloqueig != null) {
            if (respostaBloqueig == 0) {
                model.addAttribute("respostaBloqueig", "No s'ha pogut introduir el bloqueig\nComprova que les dates siguin valides");
            } else if (respostaBloqueig == 1) {
                model.addAttribute("respostaBloqueig", "Dates valides \nS'ha introduit un nou bloqueig");
            }
        }
        if (idConflictiu != null) {
            model.addAttribute("idConflictiu", "L'ID de l'event conflictiu es " + idConflictiu);

        }

    return "/views/propietats/caracteristicaPropietat";
    }

    //Metode que et dirigeix al formulari de creacio d'una propietat i et passa un titol i una llista de localitats.
    @GetMapping("/create/{Id}")
    public String crear(@ModelAttribute("idUsuari") Long idUsuari, @PathVariable("Id") Long id, Model model) {

        Propietat p = new Propietat();
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();
        Propietari propietari = propietariService.findById(id);

        if(!Objects.equals(id, idUsuari)){
            return "/views/errorAutenticacio";
        }

        model.addAttribute("propietari",propietari);
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);
        model.addAttribute("id", idUsuari);

        return "/views/propietats/frmCrearPropietat";
    }

    @PostMapping("/caracteristiques/save")
    public String guardarCaracteristiques(@RequestParam(name="idPropietat")Long idPropietat, @RequestParam(name="valorCar")List<Long> idsCarac){

        Propietat propietat = propietatService.buscarPorId(idPropietat);
        List<Caracteristica> set= new ArrayList<>();

        for (Long aLong : idsCarac) {
            set.add(caracteristicaService.findById(aLong));
        }

        propietat.setCaracteristicas(set);
        propietatService.guardar(propietat);

        return "redirect:/views/propietats/configurar/"+propietat.getIdPROPIETAT();
    }

    //Metode que s'executa quan es fa el submit del formulari crearPropietat
    @PostMapping("/save")
    public String guardar(HttpSession httpSession, @Validated @ModelAttribute Propietat p, BindingResult result) throws IOException{

        Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
        p.setPropietari(propietari);

        propietatService.guardar(p);

        return "redirect:/views/propietats/"+propietari.getId();
    }

    //Metode que elimina una propietat.
    @GetMapping("/delete/{idPROPIETAT}")
    public String eliminar(HttpSession httpSession, @PathVariable("idPROPIETAT") Long idPROPIETAT) {

        Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
        propietatService.eliminar(idPROPIETAT);
        System.out.println("Sha eliminat la propietat amb exit");

        return "redirect:/views/propietats/"+propietari.getId();
    }

    //Metode que guarda fotos secundaries de la propietat.
    @PostMapping("/fotos/save")
    public String guardarFoto(@RequestParam(name = "fotosSecundaries") MultipartFile fotoSecundaria, @Validated @ModelAttribute Propietat p) throws IOException{

        int numeroFitxers = 0;
        int numeroFitxerSum = numeroFitxers + 1;

        //Per saber el numero de fitxers que hi ha dins un directory
        String path = "/Media/"+ p.getIdPROPIETAT() + "-media/img/";
        File subcarpeta = new File(path);

        if (subcarpeta.exists()) {

            numeroFitxers = Objects.requireNonNull(subcarpeta.listFiles()).length;
            numeroFitxerSum = numeroFitxers + 1;
        }

        InputStream in = fotoSecundaria.getInputStream();

        //CODI PER OBTENIR L'EXTENSIO D'UNA IMATGE
        String nomImatge = fotoSecundaria.getOriginalFilename();
        String extension = "";
        assert nomImatge != null;
        int i = nomImatge.lastIndexOf('.');
        if (i > 0) {
            extension = nomImatge.substring(i+1);
        }

        String nomModificatImatge = p.getIdPROPIETAT()+"-" + numeroFitxerSum +"." + extension;

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Cream una carpeta per la Media de la propietat, el nom de la carpeta sera nomPropietat-img
        File carpeta = new File("/Media/"+ p.getIdPROPIETAT() + "-media/img/");
        if (!carpeta.exists()){
            if (carpeta.mkdirs()){
                System.out.println("Shan crear les carpetes");
            } else {
                System.out.println("No s'ha creat les carpetes");
            }
        }

        //Definim path de la foto (Path relatiu)
        String ruta = "/Media/" + p.getIdPROPIETAT() + "-media/img/";
        String filename = ruta + nomModificatImatge;

        OutputStream outputStream = new FileOutputStream(filename);
        out.writeTo(outputStream);

        return "redirect:/views/propietats/configurar/"+p.getIdPROPIETAT();
    }

    //Metode que guarda fotos secundaries de la propietat.
    @PostMapping("/fotoPortada/save")
    public String guardarFotoPortada(@RequestParam(name = "fotoPortada") MultipartFile fotoPortada, @Validated @ModelAttribute Propietat p) throws IOException{

        InputStream in = fotoPortada.getInputStream();

        //CODI PER OBTENIR L'EXTENSIO D'UNA IMATGE
        String nomImatge = fotoPortada.getOriginalFilename();
        String extension = "";
        assert nomImatge != null;
        int i = nomImatge.lastIndexOf('.');
        if (i > 0) {
            extension = nomImatge.substring(i+1);
        }
        //model.addAttribute("extensioImatge", extension);

        //Modificam el nom de l'imatge al dessitjat.
        String nomModificatImatge = p.getIdPROPIETAT()+"-portada." + extension;

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Cream una carpeta per la Media de la propietat, el nom de la carpeta sera nomPropietat-img
        File carpeta = new File("/Media/"+ p.getIdPROPIETAT() + "-media/img/");
        if (!carpeta.exists()){
            if (carpeta.mkdirs()){
                System.out.println("Shan crear les carpetes");
            } else {
                System.out.println("No s'ha creat les carpetes");
            }
        }

        //Definim path de la foto (Path relatiu)
        String ruta = "/Media/" + p.getIdPROPIETAT() + "-media/";

        //Ruta completa
        String filename = ruta + nomModificatImatge;

        //El condicional es per veure si han pujar una foto o no.
        if (!nomModificatImatge.equals("")) {

            OutputStream outputStream = new FileOutputStream(filename);
            out.writeTo(outputStream);
        }

        return "redirect:/views/propietats/configurar/" + p.getIdPROPIETAT();

    }
}//FI CONTROLADOR