package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Habitacions;
import cat.iesmanacor.backend_private.services.iHabitacioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@RequestMapping("/views/habitacions")
public class HabitacionController {
    @Autowired
    private iHabitacioService habitacioService;

    @GetMapping("/habitacio")
    public String llistarHabitacions(Model model){
        List<Habitacions> llistaPelicula= habitacioService.findAll();

        model.addAttribute("titulo","Llista de habitacions");
        model.addAttribute("pelicules",llistaPelicula);
        return "/views/pelicules/mostraHabitacions";
    }
    @GetMapping("/afegir")
    public String afegir(Model model){
        Habitacions habitacio = new Habitacions();
        model.addAttribute("habitacio",habitacio);
    return "/views/pelicules/frmAfegir";
    }
    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/save")
    public String save(@ModelAttribute Habitacions habitacio){
        habitacioService.save(habitacio);
        System.out.println("Cliente guardado cone xito");
        return "redirect:/views/habitacions/habitacio";
    }
    @GetMapping("/edit/{idHABITACIONS}")
    public String editar(@PathVariable("idHABITACIONS") int idHABITACIONS, Model model){
        Habitacions habitacio = habitacioService.findById(idHABITACIONS);
        model.addAttribute("titulo","Formulario: Editar habitacion");
        model.addAttribute("habitacio",habitacio);
        return "/views/pelicules/frmAfegir";
    }
    @GetMapping("/delete/{idHABITACIONS}")
    public String delete(@PathVariable("idHABITACIONS") int idHABITACIONS, Model model){
        habitacioService.delete(idHABITACIONS);
        return "redirect:/views/habitacions/habitacio";
    }
}
