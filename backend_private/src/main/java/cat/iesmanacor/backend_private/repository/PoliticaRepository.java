package cat.iesmanacor.backend_private.repository;


import cat.iesmanacor.backend_private.entitats.PoliticaCancelacio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliticaRepository extends CrudRepository<PoliticaCancelacio, Long> {
}
