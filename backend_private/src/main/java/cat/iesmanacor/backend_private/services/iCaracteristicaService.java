package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.entitats.Habitacions;
import org.springframework.stereotype.Service;

import java.util.List;

public interface iCaracteristicaService {
    List<Caracteristica> findAll();

    void save (Caracteristica caracteristica);

    Caracteristica findById(Long id);

    void delete(Long id);

}
