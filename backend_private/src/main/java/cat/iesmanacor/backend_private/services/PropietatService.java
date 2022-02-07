package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.repository.PropietatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropietatService implements iPropietatService {

    @Autowired
    private PropietatRepository propietatRepository;

    @Override
    public List<Propietat> listarTodos() {
        return (List<Propietat>) propietatRepository.findAll();
    }

    @Override
    public void guardar(Propietat p) {
        propietatRepository.save(p);
    }

    @Override
    public Propietat buscarPorId(Long idPropietat) {
        return propietatRepository.findById(idPropietat).orElse(null);
    }

    @Override
    public void eliminar(Long idPropietat) {
        propietatRepository.deleteById(idPropietat);
    }

    @Override
    public List<Propietat> findByPropietari(Propietari propietari){
        return (List<Propietat>) propietatRepository.findPropietatByPropietari(propietari);
    }

}
