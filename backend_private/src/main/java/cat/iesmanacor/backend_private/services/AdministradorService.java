package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministradorService implements iAdministradorService{
    @Autowired
    private AdministradorRepository administradorRepository;

    @Override
    public List<Administrador> findAll() {
        return (List<Administrador>) administradorRepository.findAll();
    }

    @Override
    public void save(Administrador admin) {
        administradorRepository.save(admin);
    }

    @Override
    public Administrador findById(String id) {
        return administradorRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(String id) {
        administradorRepository.deleteById(id);
    }

    @Override
    public Administrador findAdministradorByCorreu(String correu){
        return administradorRepository.findAdministradorByCorreu(correu);
    }
}
