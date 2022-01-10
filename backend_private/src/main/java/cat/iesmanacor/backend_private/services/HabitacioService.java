package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Habitacions;
import cat.iesmanacor.backend_private.repository.HabitacioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HabitacioService implements iHabitacioService{
    @Autowired
    private HabitacioRepository habitacioDATA;
    @Override
    public List<Habitacions> findAll() {
        return (List<Habitacions>) habitacioDATA.findAll();
    }

    @Override
    public void save(Habitacions habitacio) {
        habitacioDATA.save(habitacio);
    }

    @Override
    public Habitacions findById(Integer id) {
        return habitacioDATA.findById(id).orElse(null);
    }

    @Override
    public void delete(Integer id) {
        habitacioDATA.deleteById(id);
    }
}
