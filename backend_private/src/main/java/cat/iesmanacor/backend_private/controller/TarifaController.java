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

    //Metode afegir nova tarifa.
    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        Tarifa tarifa = new Tarifa();
        model.addAttribute("tarifes",tarifa);
        model.addAttribute("propietats",propietat);

        return "/views/tarifes/frmCrearTarifa";
    }

    //Metode que sexecuta en fer el submit de CREATE/UPDATE tarifa
    @PostMapping("/save")
    public String save(@ModelAttribute Tarifa tarifa, Model model){

        boolean valida = true;

        //Obtenim els valors de les dates que vol introduir l'usuari com a nova tarifa.
        LocalDate dataInici = tarifa.getDataInici();
        LocalDate dataFinal = tarifa.getDataFinal();

        //Primer de tot validam que la dataInici es anterior a la dataFinal
        if (dataInici.isAfter(dataFinal)){
            valida = false;
        }

        //Cream l'objecte propietat, ja que nomes hem de mirar que no existesqui conflicte entre les tarifes de nomes aquella propietat i no totes
        Propietat propietat = propietatService.buscarPorId(tarifa.getPropietat().getIdPROPIETAT());

        //Cream un arrayList de tarifes i afegim totes les tarifes de la propietat.
        List<Tarifa> llistaTarifes = new ArrayList<>(propietat.getTarifes());

        //Tambe cream un arrayList per tal d'enmegatzemar les tarifes conflictives i proporcionar info a l'usuari.
        List<Tarifa> tarifesConflictives = new ArrayList<>();

        for (Tarifa llistaTarife : llistaTarifes) {

            LocalDate ini = llistaTarife.getDataInici();
            LocalDate fi = llistaTarife.getDataFinal();

            //Condicional que mira si les dates d'una tarifa son valides respecte les tarifes ja existents
            //Si compleix alguna de les seguents 4 condicions vol dir que la tarifa no es valida i canviara la variable valid a false.
            if (
                    (dataFinal.isAfter(ini) && dataFinal.isBefore(fi) && dataInici.isBefore(ini)) || //Cas 1
                            ((dataInici.isAfter(ini) && dataInici.isBefore(fi)) && dataFinal.isAfter(fi)) || //Cas 2
                            ((dataInici.isBefore(ini) && dataFinal.isAfter(fi))) || //Cas 3
                            (dataInici.isAfter(ini) && dataFinal.isBefore(fi)) //Cas 4
            ) {
                //Si ha entrat vol dir que la tarifa en iteració no es valida per lo que la afegim a l'array
                tarifesConflictives.add(llistaTarife);
                valida = false;
            }
        }

        if (valida) {
            tarifaService.save(tarifa);
            System.out.println("Tarifa guardada amb exit");
            return "redirect:/views/propietats/";
        } else {
            System.out.println("Ja hi ha una tarifa en aquestes dates.");
            model.addAttribute("tarifesConflictives", tarifesConflictives);
            return "redirect:/views/propietats/";
        }

        //Logica del condicional
        /*
         * OPCIONS VALIDES
         * Si la data final es anterior a la d'inici de totes les tarifes = valid
         * -> if (dataFinal.isBefore(ini)){...}
         * Si la data inicial es posterior a totes les finals de les altres tarifes = valid
         *  -> if (dataInici.isAfter(fi)){...}
         *
         * OPCIONS NO VALIDES
         * Si la data final esta entre la dataInici i la dataFinal, i la data inicial esta anterior a la data inici  = no valid
         * -> if ((dataFinal.isAfter(ini)&&dataFinal.isBefore(fi)&&dataInici.isBefore(ini)){...}
         * Si la data inicial esta entre la dataInici i la data final, i la data final es posterior a la dataFinal = no valid
         * -> if ((dataInici.isAfter(ini)&&dataInici.isBefore(fi))&&dataFinal.isAfter(fi)){...}
         * Si la data inicial esta abans que la dataInicial i la data final esta despres de la final = no valid
         * -> if ((dataInici.isBefore(ini)&&dataFinal.isAfter(fi)){...}
         * Si la data inicial i la data final estan entre la data inicial i la data final = no valid
         * -> id (dataInici.isAfter(ini)&&dataFinal.isBefore(fi)){...}
         * */

    }

    //Metode controlador que envia l'informacio de la tarifa a editar al formulari.
    @GetMapping("/edit/{idPROPIETAT}/{idTARIFA}")
    public String editar(@PathVariable("idTARIFA") long idTARIFA,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){
        Tarifa tarifa = tarifaService.findById(idTARIFA);
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Editar Tarifas");
        model.addAttribute("tarifa",tarifa);
        model.addAttribute("propietat",propietat);
        return "/views/tarifes/frmEditarTarifes";
    }

    //Elimina una tarifa
    @GetMapping("/delete/{idTARIFA}")
    public String delete(@PathVariable("idTARIFA") long idTARIFA){
        tarifaService.delete(idTARIFA);
        return "redirect:/views/propietats/";
    }



}
