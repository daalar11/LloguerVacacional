package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepository extends CrudRepository<Caracteristica,Long> {

}
