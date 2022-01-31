package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.repository.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CaracteristicaService implements iCaracteristicaService{

    @Autowired
    CaracteristicaRepository caracteristicaDATA;

    @Override
    public List<Caracteristica> findAll() {
        return (List<Caracteristica>) caracteristicaDATA.findAll();
    }

    @Override
    public void save(Caracteristica caracteristica) {
        caracteristicaDATA.save(caracteristica);
    }

    @Override
    public Caracteristica findById(Long id) {
        return caracteristicaDATA.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        caracteristicaDATA.deleteById(id);
    }
}
