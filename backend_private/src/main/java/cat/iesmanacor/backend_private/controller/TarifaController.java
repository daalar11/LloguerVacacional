package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.entitats.Tarifa;
import cat.iesmanacor.backend_private.services.iTarifaService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/views/tarifes")
public class TarifaController {

    @Autowired
    private iTarifaService tarifaService;

    @Autowired
    private iPropietatService propietatService;

    /*@GetMapping("/")
    public String llistarTarifes(Model model){

        List<Tarifa> llistaTarifes = tarifaService.findAll();

        model.addAttribute("titulo","Llista de tarifes");
        model.addAttribute("tarifes",llistaTarifes);
        return "/views/tarifes/mostrarTarifes";
    }*/


    //Llegeix habitacions en funcio de sa propietat
    @GetMapping("/{idPROPIETAT}")
    public String llistarTarifes(Model model, @PathVariable("idPROPIETAT") Long idPROPIETAT){
        List<Tarifa> llistaTarifes = new ArrayList<>();

        List<Tarifa> llistaT = tarifaService.findAll();


        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        llistaTarifes.addAll(propietat.getTarifes());
        model.addAttribute("titulo","Llista de tarifes");
        model.addAttribute("tarifes",llistaTarifes);
        model.addAttribute("propietat",propietat);
        model.addAttribute("list",llistaT);
        return "/views/tarifes/mostrarTarifes";
    }

    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){
        Propietat listPropietat = propietatService.buscarPorId(idPROPIETAT);
        Tarifa tarifa = new Tarifa();
        model.addAttribute("tarifes",tarifa);
        model.addAttribute("propietats",listPropietat);
        return "/views/tarifes/frmCrearTarifa";
    }

    @PostMapping("/save")
    public String save(@ModelAttribute Tarifa tarifa){
        tarifaService.save(tarifa);
        System.out.println("Tarifa guardada amb exit");
        return "redirect:/views/propietats/";
    }

    //Edita ses habitacions d'una propietat concreta
    @GetMapping("/edit/{idPROPIETAT}/{idTARIFA}")
    public String editar(@PathVariable("idTARIFA") long idTARIFA,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Tarifa tarifa = tarifaService.findById(idTARIFA);
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Editar Tarifas");
        model.addAttribute("tarifa",tarifa);
        model.addAttribute("propietat",propietat);
        return "/views/tarifes/frmEditarTarifes";
    }

    //Elimina una habitacio
    @GetMapping("/delete/{idTARIFA}")
    public String delete(@PathVariable("idTARIFA") long idTARIFA){
        tarifaService.delete(idTARIFA);
        return "redirect:/views/propietats/";
    }



}
