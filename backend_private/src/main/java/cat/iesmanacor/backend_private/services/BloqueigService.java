package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import cat.iesmanacor.backend_private.repository.BloqueigRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BloqueigService implements iBloqueigService {

    @Autowired
    private BloqueigRepository bloqueigRepository;

    @Override
    public List<Bloqueig> findAll() {
        return (List<Bloqueig>) bloqueigRepository.findAll();
    }

    @Override
    public void save(Bloqueig bloqueig) {
        bloqueigRepository.save(bloqueig);
    }

    @Override
    public Bloqueig findById(Long id) {
        return bloqueigRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        bloqueigRepository.deleteById(id);
    }
}
