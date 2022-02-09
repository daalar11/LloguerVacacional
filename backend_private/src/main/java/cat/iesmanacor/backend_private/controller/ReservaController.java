package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.*;
import cat.iesmanacor.backend_private.services.iPropietariService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import cat.iesmanacor.backend_private.services.iReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/views/reserves")
public class ReservaController {

    @Autowired
    private iReservaService reservaService;

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

    //Metode per cancelar una reserva
    @GetMapping("/edit/{idPROPIETAT}/{idReserva}")
    public String editar(@ModelAttribute("idUsuari") Long idUsuari, @PathVariable("idReserva") Long idReserva,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        Reserva reserva = reservaService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Cancelar reserva");
        model.addAttribute("reserva",reserva);
        model.addAttribute("propietat",propietat);

        //Model que passa l'ID de l'USUARI (Necessari en tot moment per el link de propietats del header)
        model.addAttribute("id", idUsuari);

        return "/views/reserves/desactivarReserva";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/cancelar")
    public String cancelarReserva(@ModelAttribute("idUsuari") Long idUsuari, Model model, @ModelAttribute Reserva reserva){

        reservaService.guardar(reserva);
        Long idPropietat = reserva.getPropietat().getIdPROPIETAT();

        //Model que passa l'ID de l'USUARI (Necessari en tot moment per el link de propietats del header)
        model.addAttribute("id", idUsuari);

        return "redirect:/views/propietats/configurar/"+idPropietat;
    }

}
