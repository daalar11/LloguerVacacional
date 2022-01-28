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

    //Metode controlador que retorna una llista de les propietats per mostrarles a la dataTable.
    @GetMapping({"/"})
    public String llistarPropietats (Model model){ //(Model) El model s'utilitza per passar dades a les vistes.

        List <Propietat> llistaPropietats = propietatService.listarTodos();

        model.addAttribute("titolLlistarPropietats", "Llista de propietats");
        model.addAttribute("propietats", llistaPropietats);

        return "/views/propietats/mostrarPropietats";
    }

    //Metode controlador de configurar una propietat. Et retorna totes les dades relacionades amb la propietat.
    @GetMapping("/configurar/{idPROPIETAT}")
    public String configuracio(Model model, @PathVariable("idPROPIETAT") Long idPROPIETAT){

        //Models que envien els titols de cada Tab.
        model.addAttribute("titolEditarPropietat","Editar propietat");
        model.addAttribute("titolEditarHabitacions","Configurar habitacions");
        model.addAttribute("titolTarifes","Configurar Tarifes");
        model.addAttribute("titolCaracteristiques", "Configurar Caracteristiques");
        model.addAttribute("titolBloqueig", "Configuració dels dies de bloqueig");

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

        //Codi Bloqueig
        List<Bloqueig> llistaBloqueig = new ArrayList<>();
        llistaBloqueig.addAll(propietat.getBloqueig());
        model.addAttribute("bloqueig", llistaBloqueig);

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

        System.out.println("-- HA COMENÇAT EL METODE FOTOS --");

        InputStream in = foto.getInputStream();
        String nomImatge = foto.getOriginalFilename();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Definim path de la foto
        String ruta = "C://DAW//PROJECTEDAVID//LloguerVacacional//FOTOS//";
        String filename = ruta + nomImatge;

        OutputStream outputStream = new FileOutputStream(filename);
        out.writeTo(outputStream);

        System.out.println("-- EL METODE FOTOS SHA EXECUTAT CORRECTAMENT --");

        if (result.hasErrors()) {

            model.addAttribute("titol", "Formulari nova propietat");
            model.addAttribute("propietat", p);
            model.addAttribute("localitats", listLocalitats);

            return "/views/propietats/frmCrearPropietat";
        }

        propietatService.guardar(p);

        return "redirect:/views/propietats/";
    }


    //Metode per editar propietat
    @GetMapping("/edit/{idPROPIETAT}")
    public String editar(@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model) {

        Propietat p = propietatService.buscarPorId(idPROPIETAT);
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        model.addAttribute("titol", "Formulari Editar propietat");
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);

        return "/views/propietats/frmCrearPropietat";
    }


    //Metode que elimina una propietat.
    @GetMapping("/delete/{idPROPIETAT}")
    public String eliminar(@PathVariable("idPROPIETAT") Long idPROPIETAT) {

        propietatService.eliminar(idPROPIETAT);
        System.out.println("Sha eliminat la propietat amb exit");

        return "redirect:/views/propietats/";
    }





}