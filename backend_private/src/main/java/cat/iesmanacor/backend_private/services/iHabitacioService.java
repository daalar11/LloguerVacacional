package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Habitacio;

import java.util.List;

public interface iHabitacioService {

    public List<Habitacio> findAll();

    public void save (Habitacio habitacio);

    public Habitacio findById(Long id);

    public void delete(Long id);

    List<Habitacio> findHabitacionsByPropietat(Long id);


}
