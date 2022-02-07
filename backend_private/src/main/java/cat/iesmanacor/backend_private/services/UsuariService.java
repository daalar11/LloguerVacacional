package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Usuari;
import cat.iesmanacor.backend_private.repository.UsuariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariService implements  iUsuariService{

    @Autowired
    UsuariRepository usuariRepository;

    @Override
    public List<Usuari> findAll() {
        return (List<Usuari>) usuariRepository.findAll();
    }
}
