package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Tarifa;
import java.util.List;

public interface iTarifaService {

    List<Tarifa> findAll();

    void save (Tarifa tarifa);

    Tarifa findById(Long id);

    void delete(Long id);

    List<Tarifa> findTarifasByPropietat(Long id);

    List<Tarifa> findAllByPropietat(Long id);




}
