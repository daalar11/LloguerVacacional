package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Habitacio;
import java.util.List;

public interface iHabitacioService {

    List<Habitacio> findAll();
    void save (Habitacio habitacio);
    Habitacio findById(Long id);
    void delete(Long id);

}
