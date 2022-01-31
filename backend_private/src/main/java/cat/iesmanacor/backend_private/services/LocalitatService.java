package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Localitat;
import cat.iesmanacor.backend_private.repository.LocalitatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LocalitatService implements iLocalitatService {

    @Autowired
    private LocalitatRepository localitatRepository;

    @Override
    public List<Localitat> llistarLocalitats() {
        return (List<Localitat>) localitatRepository.findAll();
    }
}
