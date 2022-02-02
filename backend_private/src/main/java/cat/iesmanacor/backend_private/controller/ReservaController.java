package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Habitacio;
import cat.iesmanacor.backend_private.entitats.Localitat;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.entitats.Reserva;
import cat.iesmanacor.backend_private.services.iPropietatService;
import cat.iesmanacor.backend_private.services.iReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

@Controller
@RequestMapping("/views/reserves")
public class ReservaController {

    @Autowired
    private iReservaService reservaService;

    @Autowired
    private iPropietatService propietatService;

    //Metode per cancelar una reserva
    @GetMapping("/edit/{idPROPIETAT}/{idReserva}")
    public String editar(@PathVariable("idReserva") Long idReserva,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        Reserva reserva = reservaService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Cancelar reserva");
        model.addAttribute("reserva",reserva);
        model.addAttribute("propietat",propietat);

        return "/views/reserves/desactivarReserva";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/cancelar")
    public String cancelarReserva(@ModelAttribute Reserva reserva){

        reservaService.guardar(reserva);
        Long idPropietat = reserva.getPropietat().getIdPROPIETAT();

        return "redirect:/views/propietats/configurar/"+idPropietat;
    }

}
