package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import java.util.List;

public interface iBloqueigService {

    List<Bloqueig> findAll();

    void save (Bloqueig bloqueig);

    Bloqueig findById(Long id);

    void delete(Long id);

}
