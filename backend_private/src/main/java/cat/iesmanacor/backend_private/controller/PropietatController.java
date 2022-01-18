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

    @GetMapping("/create")
    public String crear(Model model) {

        Propietat p = new Propietat();
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        model.addAttribute("titol", "Formulari nova propietat");
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);

        return "/views/propietats/frmCrearPropietat";
    }

    @PostMapping("/save")
    public String guardar(@Validated @ModelAttribute Propietat p, BindingResult result, Model model){

        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        if (result.hasErrors()) {

            model.addAttribute("titol", "Formulari nova propietat");
            model.addAttribute("propietat", p);
            model.addAttribute("localitats", listLocalitats);

            System.out.println("ERROR EN EL FORMULARI");

            return "/views/propietats/frmCrearPropietat";
        }

        propietatService.guardar(p);
        System.out.println("Cliente guardado con exito");
        return "redirect:/views/propietats/";
    }


    @GetMapping("/edit/{idPROPIETAT}")
    public String editar(@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model) {

        Propietat p = propietatService.buscarPorId(idPROPIETAT);
        List<Localitat> listLocalitats = localitatService.llistarLocalitats();

        model.addAttribute("titol", "Formulari Editar propietat");
        model.addAttribute("propietat", p);
        model.addAttribute("localitats", listLocalitats);

        return "/views/propietats/frmCrearPropietat";
    }


    @GetMapping("/delete/{idPROPIETAT}")
    public String eliminar(@PathVariable("idPROPIETAT") Long idPROPIETAT) {

        propietatService.eliminar(idPROPIETAT);
        System.out.println("Sha eliminat la propietat amb exit");

        return "redirect:/views/propietats/";
    }



}