package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Tarifa;
import cat.iesmanacor.backend_private.repository.TarifaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarifaService implements iTarifaService {

    @Autowired
    private TarifaRepository tarifaRepository;

    @Override
    public List<Tarifa> findAll() {
        return (List<Tarifa>) tarifaRepository.findAll();
    }

    @Override
    public void save(Tarifa tarifa) {
        tarifaRepository.save(tarifa);
    }

    @Override
    public Tarifa findById(Long id) {
        return tarifaRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        tarifaRepository.deleteById(id);
    }

    @Override
    public List<Tarifa> findTarifasByPropietat(Long id) {
        return tarifaRepository.findTarifasByPropietat(id);
    }

    @Override
    public List<Tarifa> findAllByPropietat(Long id) {
        return tarifaRepository.findAllByPropietat(id);
    }
}
