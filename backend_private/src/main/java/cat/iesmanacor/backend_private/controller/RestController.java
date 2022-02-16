package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.config.EventJSON;
import cat.iesmanacor.backend_private.entitats.*;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    //Controllador que retorna un JSON per Get i un per POST
    //Els jsons corresponen als events de reserves(post) i bloquejos(get)

    @Autowired
    private iPropietatService propietatService;

    //Metode que retorna per get un JSON amb els bloquejos d'una propietat
    @GetMapping("/views/propietat/configurar/{idPROPIETAT}")
    public List<EventJSON> bloqueigCalendari(@PathVariable Long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        List<Bloqueig> llistaBloqueig = new ArrayList<>(propietat.getBloqueig());
        List<EventJSON> jsonBloqueig = new ArrayList<>();

        for (Bloqueig bloqueig : llistaBloqueig) {

            EventJSON eventJSON = new EventJSON();
            eventJSON.setId(bloqueig.getIdBLOQUEIG().toString());
            eventJSON.setTitle("ID Bloqueig: " + bloqueig.getIdBLOQUEIG().toString());
            eventJSON.setStart(bloqueig.getDataInici().toString());
            eventJSON.setEnd(bloqueig.getDataFinal().plusDays(1).toString()); //Sumam un dia perque es full calendar fuma porros
            eventJSON.setUrl("/views/propietats/configurar/" + idPROPIETAT);

            jsonBloqueig.add(eventJSON);

        }

        return jsonBloqueig;
    }

    //Metode que retorna per post un json amb les reserves de la propietat. Li passa a la vista mapejada
    @PostMapping("/views/propietat/configurar/{idPROPIETAT}")
    public List<EventJSON> reservesCalendari(@PathVariable Long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        List<Reserva> llistaReserves = new ArrayList<>(propietat.getReserves());
        List<EventJSON> jsonReserves = new ArrayList<>();

        //Bucle que llegeix cada reserve i agafa l'informacio per fer sets i crear un objecte de tipus eventJSON
        for (Reserva reserva : llistaReserves) {

            EventJSON eventJSON = new EventJSON();
            eventJSON.setId(reserva.getIdReserva().toString());
            eventJSON.setTitle("ID Reserva: " + reserva.getIdReserva().toString());
            eventJSON.setStart(reserva.getdArribada().toString());
            eventJSON.setEnd(reserva.getdSortida().plusDays(1).toString());
            eventJSON.setUrl("/views/propietats/configurar/" + idPROPIETAT);

            jsonReserves.add(eventJSON);

        }

        return jsonReserves;
    }

    //Metode que retorna per get un JSON amb els bloquejos d'una propietat
    @GetMapping({"/views/tarifes/frmEditarTarifes/{idPROPIETAT}/{idTarifa}", "/views/tarifes/frmCrearTarifa/{idPROPIETAT}/{idTarifa}"})
    public List<EventJSON> tarifesCalendari(@PathVariable Long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        List<Tarifa> llistaTarifes = new ArrayList<>(propietat.getTarifes());
        List<EventJSON> jsonBloqueig = new ArrayList<>();

        for (Tarifa tarifa : llistaTarifes) {

            EventJSON eventJSON = new EventJSON();
            eventJSON.setId(tarifa.getIdTARIFA().toString());
            eventJSON.setTitle("Preu Tarifació: " + tarifa.getPreu());
            eventJSON.setStart(tarifa.getDataInici().toString());
            eventJSON.setEnd(tarifa.getDataFinal().plusDays(1).toString()); //Sumam un dia perque es full calendar fuma porros
            eventJSON.setUrl("/views/propietats/configurar/" + idPROPIETAT);

            jsonBloqueig.add(eventJSON);

        }

        return jsonBloqueig;
    }


}
