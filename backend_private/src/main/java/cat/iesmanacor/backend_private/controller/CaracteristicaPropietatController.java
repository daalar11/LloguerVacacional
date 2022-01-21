package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.services.iCaracteristicaPropietatService;
import cat.iesmanacor.backend_private.services.iCaracteristicaService;
import cat.iesmanacor.backend_private.services.iHabitacioService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/views/propietats/caracteristiques")
public class CaracteristicaPropietatController {
    @Autowired
    private iCaracteristicaPropietatService carPro;

    @Autowired
    private iCaracteristicaService car;

    @Autowired
    private iPropietatService pro;

    @GetMapping("/{idPROPIETAT}/edita")
    public String llistarCarPro(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){
        List<Caracteristica> llistaCar= new ArrayList<>();
        llistaCar=car.findAll();
        model.addAttribute("caracteristiques",llistaCar);
        return "/views/propietats/Caracteristiques/mostraCaracteristiques";
    }

    @PostMapping()
    public String afegirCaracteristiques(){

    }
}
