package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Habitacions;

import java.util.List;

public interface iHabitacioService {
    public List<Habitacions> findAll();
    public void save (Habitacions habitacio);
    public Habitacions findById(Integer id);
    public void delete(Integer id);
}
