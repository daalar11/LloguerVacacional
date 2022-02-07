package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.repository.PropietariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropietariService implements  iPropietariService{
    @Autowired
    private PropietariRepository propietariRepository;
    @Override
    public List<Propietari> findAll() {
        return(List<Propietari>) propietariRepository.findAll();
    }

    @Override
    public void save(Propietari propietari) {
        propietariRepository.save(propietari);
    }

    @Override
    public Propietari findById(Long id) {
        return propietariRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        propietariRepository.deleteById(id);
    }

    @Override
    public Propietari findPropietariByCorreu(String correu){
        return propietariRepository.findPropietariByCorreu(correu);
    }
}
