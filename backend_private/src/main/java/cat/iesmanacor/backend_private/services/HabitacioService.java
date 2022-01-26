package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Habitacio;
import cat.iesmanacor.backend_private.repository.HabitacioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HabitacioService implements iHabitacioService{
    @Autowired
    private HabitacioRepository habitacioDATA;
    @Override
    public List<Habitacio> findAll() {
        return (List<Habitacio>) habitacioDATA.findAll();
    }

    @Override
    public void save(Habitacio habitacio) {
        habitacioDATA.save(habitacio);
    }

    @Override
    public Habitacio findById(Long id) {
        return habitacioDATA.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        habitacioDATA.deleteById(id);
    }

    @Override
    public List<Habitacio> findHabitacionsByPropietat(Long id) {
        return habitacioDATA.findHabitacionsByPropietat(id);
    }


}
