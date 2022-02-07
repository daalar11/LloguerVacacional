package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.*;
import cat.iesmanacor.backend_private.services.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

    //Metode controlador que retorna una llista de les propietats per mostrarles a la dataTable.
    @GetMapping({"/{Id}"})
    public String llistarPropietats (@PathVariable("Id") Long id, Model model, HttpSession httpSession){ //(Model) El model s'utilitza per passar dades a les vistes.
        if(httpSession.getAttribute("rol").equals("propietari")){

        }
        List <Propietat> llistaPropietats = propietatService.listarTodos();

        model.addAttribute("titolLlistarPropietats", "Llista de propietats");
        model.addAttribute("propietats", llistaPropietats);

        return "/views/propietats/mostrarPropietats";
    }

    //Metode controlador de configurar una propietat. Et retorna totes les dades relacionades amb la propietat.
    @GetMapping("/configurar/{idPROPIETAT}")
    public String configuracio(Model model, @PathVariable("idPROPIETAT") Long idPROPIETAT){

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


    return "/views/propietats/caracteristicaPropietat";
    }

    //Metode que et dirigeix al formulari de creacio d'una propietat i et passa un titol i una llista de localitats.
    @GetMapping("/create")
    public String crear(Model model) {

        Propietat p = new Propietat();
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);

        return "/views/propietats/frmCrearPropietat";
    }

    @PostMapping("/caracteristiques/save")
    public String guardarCaracteristiques(@RequestParam(name="idPropietat")Long idPropietat,@RequestParam(name="valorCar")List<Long> idsCarac){

        Propietat propietat = propietatService.buscarPorId(idPropietat);
        List<Caracteristica> set= new ArrayList<>();

        for (int i = 0; i < idsCarac.size(); i++) {
            set.add(caracteristicaService.findById(idsCarac.get(i)));
        }

        propietat.setCaracteristicas(set);
        propietatService.guardar(propietat);

        return "redirect:/views/propietats/";
    }

    //Metode que s'executa quan es fa el submit del formulari crearPropietat
    @PostMapping("/save")
    public String guardar(@RequestParam(name = "file") MultipartFile foto, @Validated @ModelAttribute Propietat p, BindingResult result, Model model) throws IOException{

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

        if (result.hasErrors()) {

            model.addAttribute("titol", "Formulari nova propietat");
            model.addAttribute("propietat", p);
            model.addAttribute("localitats", listLocalitats);

            return "/views/propietats/frmCrearPropietat";
        }

        propietatService.guardar(p);

        return "redirect:/views/propietats/";
    }

    //Metode que elimina una propietat.
    @GetMapping("/delete/{idPROPIETAT}")
    public String eliminar(@PathVariable("idPROPIETAT") Long idPROPIETAT) {

        propietatService.eliminar(idPROPIETAT);
        System.out.println("Sha eliminat la propietat amb exit");

        return "redirect:/views/propietats/";
    }

    //Metode que guarda fotos secundaries de la propietat.
    @PostMapping("/fotos/save")
    public String guardarFoto(@RequestParam(name = "fotosSecundaries") MultipartFile foto, @Validated @ModelAttribute Propietat p) throws IOException{

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

        return "redirect:/views/propietats/configurar/"+p.getIdPROPIETAT();
    }



}