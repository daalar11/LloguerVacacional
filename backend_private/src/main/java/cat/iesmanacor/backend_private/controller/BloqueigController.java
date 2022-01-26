package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.services.iBloqueigService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/views/bloqueig")
public class BloqueigController {

    @Autowired
    private iBloqueigService bloqueigService;

    @Autowired
    private iPropietatService propietatService;

    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){
        Propietat listPropietat = propietatService.buscarPorId(idPROPIETAT);
        Bloqueig bloqueig = new Bloqueig();
        model.addAttribute("bloqueig",bloqueig);
        model.addAttribute("propietats",listPropietat);
        return "/views/bloqueig/frmCrearBloqueig";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/save")
    public String save(@ModelAttribute Bloqueig bloqueig){
        bloqueigService.save(bloqueig);
        System.out.println("Cliente guardado cone xito");
        Long idPropietat=bloqueig.getPropietat().getIdPROPIETAT();
        return "redirect:/views/propietats/configurar/"+idPropietat;
    }

    //Elimina una habitacio
    @GetMapping("/delete/{idBLOQUEIG}")
    public String delete(@PathVariable("idBLOQUEIG") long idBLOQUEIG){
        bloqueigService.delete(idBLOQUEIG);
        return "redirect:/views/propietats/";
    }



}
