package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.*;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private iPropietatService propietatService;

    @GetMapping("/views/propietat/configurar/{idPROPIETAT}")
    public List<EventJSON> bloqueigCalendari(@PathVariable long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        List<Bloqueig> llistaBloqueig = new ArrayList<>(propietat.getBloqueig());
        List<EventJSON> jsonBloqueig = new ArrayList<>();

        for (Bloqueig bloqueig : llistaBloqueig) {

            EventJSON eventJSON = new EventJSON();
            eventJSON.setId(bloqueig.getIdBLOQUEIG().toString());
            eventJSON.setTitle("ID Bloqueig: " + bloqueig.getIdBLOQUEIG().toString());
            eventJSON.setStart(bloqueig.getDataInici().toString());
            eventJSON.setEnd(bloqueig.getDataFinal().toString());
            eventJSON.setUrl("/views/propietats/configurar/" + idPROPIETAT);

            jsonBloqueig.add(eventJSON);

        }

        return jsonBloqueig;
    }

    @PostMapping("/views/propietat/configurar/{idPROPIETAT}")
    public List<EventJSON> reservesCalendari(@PathVariable long idPROPIETAT){

        Propietat propietat = propietatService.buscarPorId(idPROPIETAT);
        List<Reserva> llistaReserves = new ArrayList<>(propietat.getReserves());
        List<EventJSON> jsonReserves = new ArrayList<>();

        for (Reserva reserva : llistaReserves) {

            EventJSON eventJSON = new EventJSON();
            eventJSON.setId(reserva.getIdReserva().toString());
            eventJSON.setTitle("ID Reserva: " + reserva.getIdReserva().toString());
            eventJSON.setStart(reserva.getdArribada().toString());
            eventJSON.setEnd(reserva.getdSortida().toString());
            eventJSON.setUrl("/views/propietats/configurar/" + idPROPIETAT);

            jsonReserves.add(eventJSON);

        }

        return jsonReserves;
    }


}
