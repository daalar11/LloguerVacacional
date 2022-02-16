package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.entitats.Reserva;
import cat.iesmanacor.backend_private.services.iBloqueigService;
import cat.iesmanacor.backend_private.services.iPropietariService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
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

    @Autowired
    private iPropietariService propietariService;

    @ModelAttribute
    public void addAttributes(Model model, HttpSession httpSession) {

        if (httpSession.getAttribute("usuari") != null){
            Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            model.addAttribute("idUsuari", propietari.getId());
        }
    }

    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(@ModelAttribute("idUsuari") Long idUsuari, Model model,@PathVariable("idPROPIETAT") Long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        Bloqueig bloqueig = new Bloqueig();
        model.addAttribute("bloqueig",bloqueig);
        model.addAttribute("propietats",propietat);
        model.addAttribute("id", idUsuari);
        if(!idUsuari.equals(propietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
        return "/views/bloqueig/frmCrearBloqueig";
    }

    //recibe los datos del formulario para enviarlos a la bd
    @PostMapping("/save")
    public String save(@ModelAttribute Bloqueig bloqueig) {

        //Boolean que indica si es pot fer el save o no. Si es true es fa l'insert si es false no ho fa.
        boolean valida = true;

        //Obtenim els valors de les dates que vol introduir l'usuari com a nova tarifa.
        LocalDate dataInici = bloqueig.getDataInici();
        LocalDate dataFinal = bloqueig.getDataFinal();

        //Primer de tot validam que la dataInici es anterior a la dataFinal
        if (dataInici.isAfter(dataFinal)) {
            valida = false;
        }

        //Cream l'objecte propietat, ja que nomes hem de mirar que no existesqui conflicte entre els bloquejos de nomes aquella propietat i no totes
        Propietat propietat = propietatService.buscarPorId(bloqueig.getPropietat().getIdPROPIETAT());

        //Cream un arrayList de bloquejos i afegim tots els bloquejos de la propietat.
        List<Bloqueig> llistaBloqueig = new ArrayList<>();
        llistaBloqueig.addAll(propietat.getBloqueig());

        //Com que un propietari no ha de poder bloquejar un dia que esta reservat tambe necessitarem obtenir totes les reserves de la casa
        List<Reserva> llistaReserves = new ArrayList<>();
        llistaReserves.addAll(propietat.getReserves());

        //Tambe cream un arrayList per tal d'enmegatzemar les tarifes conflictives i proporcionar info a l'usuari.
        long idReservaConflictiva = -1;
        long idBloqueigConclictiu = -1;

        //Bucle que recorr els bloquejos d'una propietat per cada iteració.
        for (int i = 0; i < llistaBloqueig.size(); i++) {

            LocalDate ini = llistaBloqueig.get(i).getDataInici();
            LocalDate fi = llistaBloqueig.get(i).getDataFinal();

            //Condicional que mira si les dates d'una tarifa son valides respecte les tarifes ja existents
            //Si compleix alguna de les seguents 4 condicions vol dir que la tarifa no es valida i canviara la variable valid a false.
            if (
                    ((dataFinal.isAfter(ini) || dataFinal.isEqual(ini)) && (dataFinal.isBefore(fi) || dataFinal.isEqual(fi)) && dataInici.isBefore(ini)) || //Cas 1
                            ((dataInici.isAfter(ini) || dataInici.isEqual(ini)) && (dataInici.isBefore(fi) || dataInici.isEqual(fi)) && dataFinal.isAfter(fi)) || //Cas 2
                            ((dataInici.isBefore(ini) || dataInici.isEqual(ini)) && (dataFinal.isAfter(fi) || dataFinal.isEqual(fi))) || //Cas 3
                            ((dataInici.isAfter(ini) || dataInici.isEqual(ini)) && (dataFinal.isBefore(fi) || dataFinal.isEqual(fi))) //Cas 4

            ) {
                //Si ha entrat vol dir que la tarifa en iteració no es valida per lo que la afegim a l'array
                idBloqueigConclictiu = llistaBloqueig.get(i).getIdBLOQUEIG();
                valida = false;

            }
        }

        //Bucle que recorr els bloquejos d'una propietat per cada iteració.
        for (int z = 0; z < llistaReserves.size(); z++) {

            LocalDate ini = llistaReserves.get(z).getdArribada();
            LocalDate fi = llistaReserves.get(z).getdSortida();

            //Condicional que mira si les dates d'una tarifa son valides respecte les tarifes ja existents
            //Si compleix alguna de les seguents 4 condicions vol dir que la tarifa no es valida i canviara la variable valid a false.
            if (
                    ((dataFinal.isAfter(ini) || dataFinal.isEqual(ini)) && (dataFinal.isBefore(fi) || dataFinal.isEqual(fi)) && dataInici.isBefore(ini)) || //Cas 1
                            ((dataInici.isAfter(ini) || dataInici.isEqual(ini)) && (dataInici.isBefore(fi) || dataInici.isEqual(fi)) && dataFinal.isAfter(fi)) || //Cas 2
                            ((dataInici.isBefore(ini) || dataInici.isEqual(ini)) && (dataFinal.isAfter(fi) || dataFinal.isEqual(fi))) || //Cas 3
                            ((dataInici.isAfter(ini) || dataInici.isEqual(ini)) && (dataFinal.isBefore(fi) || dataFinal.isEqual(fi))) //Cas 4

            ) {
                //Si ha entrat vol dir que la tarifa en iteració no es valida per lo que la afegim a l'array
                idReservaConflictiva = llistaReserves.get(z).getIdReserva();
                valida = false;
                break;

            }
        }

        if (valida) {
            bloqueigService.save(bloqueig);

            return "redirect:/views/propietats/configurar/" + propietat.getIdPROPIETAT() + "?respostaBloqueig=1";
        } else {

            if (idReservaConflictiva != -1) {

                return "redirect:/views/propietats/configurar/" + propietat.getIdPROPIETAT() + "?respostaBloqueig=0&idConflictiu=" + idReservaConflictiva;
            } else {

                return "redirect:/views/propietats/configurar/" + propietat.getIdPROPIETAT() + "?respostaBloqueig=0&idConflictiu=" + idBloqueigConclictiu;
            }

        }

    }

    //Edita ses habitacions d'una propietat concreta
    @GetMapping("/edit/{idPROPIETAT}/{idBLOQUEIG}")
    public String editar(@ModelAttribute("idUsuari") Long idUsuari, @PathVariable("idBLOQUEIG") long idBLOQUEIG,@PathVariable("idPROPIETAT") Long idPROPIETAT, Model model){

        Bloqueig bloqueig = bloqueigService.findById(idBLOQUEIG);
        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        model.addAttribute("titulo","Formulario: Editar Bloqueig");
        model.addAttribute("bloqueig",bloqueig);
        model.addAttribute("propietat",propietat);
        model.addAttribute("id", idUsuari);

        if(!idUsuari.equals(propietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
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
