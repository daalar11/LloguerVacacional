package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.entitats.Tarifa;
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
    public String save(@ModelAttribute Bloqueig bloqueig, Model model){

        boolean valida = true;

        //Obtenim els valors de les dates que vol introduir l'usuari com a nova tarifa.
        LocalDate dataInici = bloqueig.getDataInici();
        LocalDate dataFinal = bloqueig.getDataFinal();

        //Primer de tot validam que la dataInici es anterior a la dataFinal
        if (dataInici.isAfter(dataFinal)){
            valida = false;
        }

        //Cream l'objecte propietat, ja que nomes hem de mirar que no existesqui conflicte entre les tarifes de nomes aquella propietat i no totes
        Propietat propietat = propietatService.buscarPorId(bloqueig.getPropietat().getIdPROPIETAT());

        //Cream un arrayList de tarifes i afegim totes les tarifes de la propietat.
        List<Bloqueig> llistaBloqueig = new ArrayList<>();
        llistaBloqueig.addAll(propietat.getBloqueig());

        //Tambe cream un arrayList per tal d'enmegatzemar les tarifes conflictives i proporcionar info a l'usuari.
        List<Bloqueig> bloqueigsConflictius = new ArrayList<>();

        for (int i = 0; i<llistaBloqueig.size();i++){

            LocalDate ini = llistaBloqueig.get(i).getDataInici();
            LocalDate fi = llistaBloqueig.get(i).getDataFinal();

            //Condicional que mira si les dates d'una tarifa son valides respecte les tarifes ja existents
            //Si compleix alguna de les seguents 4 condicions vol dir que la tarifa no es valida i canviara la variable valid a false.
            if (
                    (dataFinal.isAfter(ini)&&dataFinal.isBefore(fi)&&dataInici.isBefore(ini)) || //Cas 1
                            ((dataInici.isAfter(ini)&&dataInici.isBefore(fi))&&dataFinal.isAfter(fi)) || //Cas 2
                            ((dataInici.isBefore(ini)&&dataFinal.isAfter(fi))) || //Cas 3
                            (dataInici.isAfter(ini)&&dataFinal.isBefore(fi)) //Cas 4
            ){
                //Si ha entrat vol dir que la tarifa en iteració no es valida per lo que la afegim a l'array
                bloqueigsConflictius.add(llistaBloqueig.get(i));
                valida = false;
            }
        }

        if (valida) {
            bloqueigService.save(bloqueig);
            System.out.println("bloqueig guardat amb exit");
            return "redirect:/views/propietats/configurar/"+propietat.getIdPROPIETAT();
        } else {
            System.out.println("Ja hi ha un bloqueig en aquestes dates.");
            model.addAttribute("tarifesConflictives", bloqueigsConflictius);
            return "redirect:/views/propietats/configurar/"+propietat.getIdPROPIETAT();
        }

    }

    //Edita ses habitacions d'una propietat concreta
    @GetMapping("/edit/{idPROPIETAT}/{idBLOQUEIG}")
    public String editar(@PathVariable("idBLOQUEIG") long idBLOQUEIG,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Bloqueig bloqueig = bloqueigService.findById(idBLOQUEIG);
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Editar Bloqueig");
        model.addAttribute("bloqueig",bloqueig);
        model.addAttribute("propietat",propietat);
        return "/views/bloqueig/frmEditarBloqueig";
    }

    //Elimina una habitacio
    @GetMapping("/delete/{idBLOQUEIG}")
    public String delete(@PathVariable("idBLOQUEIG") long idBLOQUEIG){
        Bloqueig bloqueig = bloqueigService.findById(idBLOQUEIG);
        long idPROPIETAT = bloqueig.getPropietat().getIdPROPIETAT();

        bloqueigService.delete(idBLOQUEIG);
        return "redirect:/views/propietats/configurar/"+idPROPIETAT;
    }



}