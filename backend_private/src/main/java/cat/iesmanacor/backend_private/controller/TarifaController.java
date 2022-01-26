package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.entitats.Tarifa;
import cat.iesmanacor.backend_private.services.iTarifaService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    /*@GetMapping("/{idPROPIETAT}")
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
    }*/

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

        boolean valid = false;

        //Tractament per veure si les dates son valides i no hi ha conflictes amb tarifes existents
        LocalDate dataInici = tarifa.getDataInici();
        LocalDate dataFinal = tarifa.getDataFinal();

        Propietat propietat = propietatService.buscarPorId(tarifa.getPropietat().getIdPROPIETAT());
        List<Tarifa> llistaTarifes = new ArrayList<>();
        llistaTarifes.addAll(propietat.getTarifes());

        for (int i = 0; i<llistaTarifes.size();i++){

            LocalDate ini = llistaTarifes.get(i).getDataInici();
            LocalDate fi = llistaTarifes.get(i).getDataFinal();

            if (dataFinal.isBefore(ini)||dataInici.isAfter(fi)){
                valid = true;
            }


        }

        /*
        * if (
                            (dataInici.isAfter(ini)&&dataFinal.isBefore(fi))||
                            (dataInici.isBefore(ini)&&dataFinal.isBefore(ini)||
                            (dataInici.isAfter(ini)&&dataFinal.isBefore(fi)))
            ){
                valid = false;
            }
        * */
        if (valid) {
            tarifaService.save(tarifa);
            System.out.println("Tarifa guardada amb exit");
            return "redirect:/views/propietats/";
        } else {
            System.out.println("Ja hi ha una tarifa en aquestes dates.");
            return "redirect:/views/propietats/";
        }
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
