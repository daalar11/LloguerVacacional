package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Habitacions;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.services.iHabitacioService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@Controller
@RequestMapping("/views/habitacions")
public class HabitacionController {
    //Habitacions es ManyToOne de propietats
    @Autowired
    private iHabitacioService habitacioService;

    @Autowired
    private iPropietatService propietatService;

    //Llegeix habitacions en funcio de sa propietat
    @GetMapping("/habitacio/{idPROPIETAT}")
    public String llistarHabitacions(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){
        List<Habitacions> llistaPelicula=new ArrayList<>();
        Propietat habitacio = propietatService.buscarPorId(idPROPIETAT);
        llistaPelicula.addAll(habitacio.getHabitacions());
        model.addAttribute("titulo","Llista de habitacions");
        model.addAttribute("pelicules",llistaPelicula);
        model.addAttribute("propietat",habitacio);
        return "/views/pelicules/mostraHabitacions";
    }

    //Afegeix habitacions en funcio de sa propietat
    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){
        Propietat listPropietat = propietatService.buscarPorId(idPROPIETAT);
        Habitacions habitacio = new Habitacions();
        model.addAttribute("habitacio",habitacio);
        model.addAttribute("propietats",listPropietat);
    return "/views/pelicules/frmAfegir";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/save")
    public String save(@ModelAttribute Habitacions habitacio){
        habitacioService.save(habitacio);
        System.out.println("Cliente guardado cone xito");
        return "redirect:/views/propietats/";
    }

    //Edita ses habitacions d'una propietat concreta
    @GetMapping("/edit/{idPROPIETAT}/{idHABITACIONS}")
    public String editar(@PathVariable("idHABITACIONS") int idHABITACIONS,@PathVariable("idPROPIETAT") int idPROPIETAT, Model model){
        Habitacions habitacio = habitacioService.findById(idHABITACIONS);
        model.addAttribute("titulo","Formulario: Editar habitacion");
        model.addAttribute("habitacio",habitacio);
        model.addAttribute("propietat",idPROPIETAT);
        return "/views/pelicules/frmEditar";
    }

    //Elimina una habitacio
    @GetMapping("/delete/{idHABITACIONS}")
    public String delete(@PathVariable("idHABITACIONS") int idHABITACIONS, Model model){
        habitacioService.delete(idHABITACIONS);
        return "redirect:/views/propietats/";
    }
}
