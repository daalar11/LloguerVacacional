package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.PoliticaCancelacio;
import cat.iesmanacor.backend_private.repository.PoliticaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PoliticaService implements iPoliticaService{

    @Autowired
    private PoliticaRepository politicaRepository;

    @Override
    public List<PoliticaCancelacio> findAll(){
        return (List<PoliticaCancelacio>) politicaRepository.findAll();
    }

    @Override
    public void save(PoliticaCancelacio politica) {
        politicaRepository.save(politica);
    }

    @Override
    public PoliticaCancelacio findById(Long id) {
        return politicaRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        politicaRepository.deleteById(id);
    }
}
