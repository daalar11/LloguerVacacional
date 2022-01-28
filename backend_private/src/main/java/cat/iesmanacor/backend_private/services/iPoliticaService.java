package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.PoliticaCancelacio;

import java.util.List;

public interface iPoliticaService {

    List<PoliticaCancelacio> findAll();

    void save (PoliticaCancelacio politica);

    PoliticaCancelacio findById(Long id);

    void delete(Long id);
}
