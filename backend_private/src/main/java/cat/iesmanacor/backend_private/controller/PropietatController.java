package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Habitacions;
import cat.iesmanacor.backend_private.entitats.Localitat;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.services.iLocalitatService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

//NOTACIO OBLIGATORIA (PAQUET AL QUE PERTANY)
@Controller
@RequestMapping("/views/propietats")
public class PropietatController {

    @Autowired
    private iPropietatService propietatService;

    @Autowired
    private iLocalitatService localitatService;

    //LListar totes les propietats
    @GetMapping({"/"})
    public String llistarPropietats (Model model){ //Per enviar dades a la vista

        List <Propietat> llistaPropietats = propietatService.listarTodos();

        model.addAttribute("titol", "Llista de propietats");
        model.addAttribute("propietat", llistaPropietats);

        return "/views/propietats/mostrarPropietats";
    }

    @GetMapping("/configurar/{idPROPIETAT}")
    public String prova(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){

       List<Habitacions> llistaPelicula=new ArrayList<>();
        Propietat habitacio = propietatService.buscarPorId(idPROPIETAT);
        llistaPelicula.addAll(habitacio.getHabitacions());
        model.addAttribute("pelicules",llistaPelicula);
        model.addAttribute("propietat1",habitacio);

        List<Localitat> listLocalitats = localitatService.llistarLocalitats();
        Propietat propietat= propietatService.buscarPorId(idPROPIETAT);
        model.addAttribute("editarPropietat","Editar propietat");
        model.addAttribute("editarHabitacions","Configurar habitacions");
        model.addAttribute("propietat",propietat);
        model.addAttribute("localitats", listLocalitats);


    return "/views/propietats/caracteristicaPropietat";
    }

    //Metode que et dirigeix al formulari de creacio d'una propietat i et passa un titol i una llista de localitats.
    @GetMapping("/create")
    public String crear(Model model) {

        Propietat p = new Propietat();
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        model.addAttribute("titol", "Formulari nova propietat");
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);

        return "/views/propietats/frmCrearPropietat";
    }

    //Metode que s'executa quan es fa el submit del formulari crearPropietat
    @PostMapping("/save")
    public String guardar(@RequestParam(name = "file") MultipartFile foto, @Validated @ModelAttribute Propietat p, BindingResult result, Model model) throws IOException{

        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        System.out.println("HA COMENÇAT EL METODE FOTOS");

        InputStream in = foto.getInputStream();
        String nomImatge = foto.getOriginalFilename();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] readBuf = new byte[4096];
        while (in.available() > 0){
            int bytesRead = in.read(readBuf);
            out.write(readBuf, 0, bytesRead);
        }

        //Definim path de la foto
        String ruta = "C://DAW//PROJECTEDAVID//LloguerVacacional//Fotos//";
        String filename = ruta + nomImatge;

        OutputStream outputStream = new FileOutputStream(filename);
        out.writeTo(outputStream);

        System.out.println("EL METODE FOTOS SHA EXECUTAT CORRECTAMENT");

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