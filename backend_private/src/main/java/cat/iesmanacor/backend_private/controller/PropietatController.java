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

//NOTACIO OBLIGATORIA (PAQUET AL QUE PERTANY)
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
    private iTarifaService tarifaService;
    @Autowired
    private iHabitacioService habitacioService;
    @Autowired
    private iPoliticaService politicaService;
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
    public String llistarPropietats (@PathVariable("Id") Long id, Model model, HttpSession httpSession){ //(Model) El model s'utilitza per passar dades a les vistes.
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
    public String configuracio(@ModelAttribute("idUsuari") Long idUsuari, Model model, @PathVariable("idPROPIETAT") Long idPROPIETAT, HttpSession httpSession){

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
        List<Habitacio> llistaHabitacions=new ArrayList<>();
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        if(propietat.getPropietari().getId()!= idUsuari){
            return "/views/errorAutenticacio";
        }
        llistaHabitacions.addAll(propietat.getHabitacions());
        model.addAttribute("habitacions",llistaHabitacions);
        model.addAttribute("propietat",propietat);

        //Codi Localitat
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();
        model.addAttribute("localitats", listLocalitats);

        //Codi Tarifes
        List<Tarifa> llistaTarifes = new ArrayList<>();
        llistaTarifes.addAll(propietat.getTarifes());
        model.addAttribute("tarifes",llistaTarifes);

        //Codi Caracteristiques
        List<Caracteristica> llistaCar = caracteristicaService.findAll();
        Caracteristica carac= new Caracteristica();
        model.addAttribute("idPropietat",idPROPIETAT);
        model.addAttribute("caracteristiques",llistaCar);
        List<Caracteristica>prova = propietat.getCaracteristicas();

        List<CaracteristicaDTO> llistaDTO = new ArrayList<>();
        for(int i=0; i<llistaCar.size();i++){
            boolean isThere = false;
            for(int j=0;j<prova.size();j++){
                if(llistaCar.get(i).getIdCaracteristica().equals(prova.get(j).getIdCaracteristica())){
                    llistaDTO.add(new CaracteristicaDTO(llistaCar.get(i),true));
                    isThere = true;
                }
            }
            if (!isThere) {
                llistaDTO.add(new CaracteristicaDTO(llistaCar.get(i),false));
            }
        }
        System.out.println(llistaDTO);
        model.addAttribute("caracteristiquesProp",llistaDTO);

        //Codi Bloqueig
        List<Bloqueig> llistaBloqueig = new ArrayList<>();
        llistaBloqueig.addAll(propietat.getBloqueig());
        model.addAttribute("bloqueig", llistaBloqueig);

        //Codi Reserves
        List <Reserva> llistaReserves = new ArrayList<>();
        llistaReserves.addAll(propietat.getReserves());
        model.addAttribute("reserves", llistaReserves);

        //Listar politicas de cancelacio
        List<PoliticaCancelacio> politiques = new ArrayList<>();
        politiques.addAll(propietat.getPolitica());
        model.addAttribute("politiques",politiques);

        model.addAttribute("id", idUsuari);

    return "/views/propietats/caracteristicaPropietat";
    }

    //Metode que et dirigeix al formulari de creacio d'una propietat i et passa un titol i una llista de localitats.
    @GetMapping("/create/{Id}")
    public String crear(@ModelAttribute("idUsuari") Long idUsuari, @PathVariable("Id") Long id,Model model, HttpSession httpSession) {

        Propietat p = new Propietat();
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();
        Propietari propietari = propietariService.findById(id);
        if(id != idUsuari){
            return "/views/errorAutenticacio";
        }
        model.addAttribute("propietari",propietari);
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);
        model.addAttribute("id", idUsuari);




        return "/views/propietats/frmCrearPropietat";
    }

    @PostMapping("/caracteristiques/save")
    public String guardarCaracteristiques(@ModelAttribute("idUsuari") Long idUsuari, @RequestParam(name="idPropietat")Long idPropietat,@RequestParam(name="valorCar")List<Long> idsCarac, Model model){

        Propietat propietat = propietatService.buscarPorId(idPropietat);
        List<Caracteristica> set= new ArrayList<>();

        for (int i = 0; i < idsCarac.size(); i++) {
            set.add(caracteristicaService.findById(idsCarac.get(i)));
        }

        propietat.setCaracteristicas(set);
        propietatService.guardar(propietat);

        model.addAttribute("id", idUsuari);

        return "redirect:/views/propietats/configurar/"+propietat.getIdPROPIETAT();
    }

    //Metode que s'executa quan es fa el submit del formulari crearPropietat
    @PostMapping("/save")
    public String guardar(@ModelAttribute("idUsuari") Long idUsuari, HttpSession httpSession, @RequestParam(name = "file") MultipartFile foto, @Validated @ModelAttribute Propietat p, BindingResult result, Model model) throws IOException{

        Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());

        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        InputStream in = foto.getInputStream();
        String nomImatge = foto.getOriginalFilename();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Cream una carpeta per la Media de la propietat, el nom de la carpeta sera nomPropietat-img
        File carpeta = new File("../Media/"+ p.getNomPropietat().replace(" ", "") + "-media/img/");
        if (!carpeta.exists()){
            if (carpeta.mkdirs()){
                System.out.println("Shan crear les carpetes");
            } else {
                System.out.println("No s'ha creat les carpetes");
            }
        }

        //Definim path de la foto (Path relatiu)
        String ruta = "../Media/" + p.getNomPropietat().replace(" ", "") + "-media/";

        //Ruta completa
        String filename = ruta + nomImatge;

        //El condicional es per veure si han pujar una foto o no.
        if (nomImatge != "") {

            OutputStream outputStream = new FileOutputStream(filename);
            out.writeTo(outputStream);
        }
        model.addAttribute("id", idUsuari);

        if (result.hasErrors()) {

            model.addAttribute("titol", "Formulari nova propietat");
            model.addAttribute("propietat", p);
            model.addAttribute("localitats", listLocalitats);

            return "redirect:/views/propietats/configurar/" + p.getIdPROPIETAT();
        }

        propietatService.guardar(p);

        return "redirect:/views/propietats/"+propietari.getId();
    }

    //Metode que elimina una propietat.
    @GetMapping("/delete/{idPROPIETAT}")
    public String eliminar(@ModelAttribute("idUsuari") Long idUsuari, HttpSession httpSession, @PathVariable("idPROPIETAT") Long idPROPIETAT) {

        Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());

        propietatService.eliminar(idPROPIETAT);
        System.out.println("Sha eliminat la propietat amb exit");

        return "redirect:/views/propietats/"+idUsuari;
    }

    //Metode que guarda fotos secundaries de la propietat.
    @PostMapping("/fotos/save")
    public String guardarFoto(@ModelAttribute("idUsuari") Long idUsuari, @RequestParam(name = "fotosSecundaries") MultipartFile foto, @Validated @ModelAttribute Propietat p, Model model) throws IOException{

        InputStream in = foto.getInputStream();
        String nomImatge = foto.getOriginalFilename();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Cream una carpeta per la Media de la propietat, el nom de la carpeta sera nomPropietat-img
        File carpeta = new File("../Media/"+ p.getNomPropietat().replace(" ", "") + "-media/img/");
        if (!carpeta.exists()){
            if (carpeta.mkdirs()){
                System.out.println("Shan crear les carpetes");
            } else {
                System.out.println("No s'ha creat les carpetes");
            }
        }

        //Definim path de la foto (Path relatiu)
        String ruta = "../Media/" + p.getNomPropietat().replace(" ", "") + "-media/img/";
        String filename = ruta + nomImatge;

        OutputStream outputStream = new FileOutputStream(filename);
        out.writeTo(outputStream);

        model.addAttribute("id", idUsuari);

        return "redirect:/views/propietats/configurar/"+p.getIdPROPIETAT();
    }




}