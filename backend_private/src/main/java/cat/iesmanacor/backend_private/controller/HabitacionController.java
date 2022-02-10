package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Habitacio;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.services.iHabitacioService;
import cat.iesmanacor.backend_private.services.iPropietariService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/views/habitacions")
public class HabitacionController {

    @Autowired
    private iHabitacioService habitacioService;

    @Autowired
    private iPropietatService propietatService;

    @Autowired
    private iPropietariService propietariService;

    @ModelAttribute
    public void addAttributes(Model model, HttpSession httpSession) {

        if (httpSession.getAttribute("usuari") != null){
            Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            model.addAttribute("idUsuari", propietari.getId());
        }
    }

    //Afegeix habitacions en funcio de sa propietat
    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(@ModelAttribute("idUsuari") Long idUsuari, Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){

        Propietat listPropietat = propietatService.buscarPorId(idPROPIETAT);
        Habitacio habitacio = new Habitacio();
        model.addAttribute("habitacio",habitacio);
        model.addAttribute("propietats",listPropietat);
        model.addAttribute("id", idUsuari);
        if(!idUsuari.equals(listPropietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
        return "/views/habitacions/frmAfegir";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/save")
    public String save(@ModelAttribute Habitacio habitacio){

        habitacioService.save(habitacio);
        Long idPropietat=habitacio.getPropietat().getIdPROPIETAT();

        return "redirect:/views/propietats/configurar/"+idPropietat;
    }

    //Edita ses habitacions d'una propietat concreta
    @GetMapping("/edit/{idPROPIETAT}/{idHABITACIONS}")
    public String editar(@ModelAttribute("idUsuari") Long idUsuari, @PathVariable("idHABITACIONS") Long idHABITACIONS,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        Habitacio habitacio = habitacioService.findById(idHABITACIONS);
        model.addAttribute("titulo","Formulario: Editar habitacion");
        model.addAttribute("habitacio",habitacio);
        model.addAttribute("propietat",propietat);

        //Model que passa l'ID de l'USUARI (Necessari en tot moment per el link de propietats del header)
        model.addAttribute("id", idUsuari);
        if(!idUsuari.equals(propietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
        return "/views/habitacions/frmEditar";
    }

    //Elimina una habitacio
    @GetMapping("/delete/{idHABITACIONS}")
    public String delete(@PathVariable("idHABITACIONS") Long idHABITACIONS){

        Habitacio habitacio= habitacioService.findById(idHABITACIONS);
        Long idPropietat=habitacio.getPropietat().getIdPROPIETAT();
        habitacioService.delete(idHABITACIONS);

        return "redirect:/views/propietats/configurar/"+idPropietat;
    }
}
