package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Tarifa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TarifaRepository extends CrudRepository <Tarifa, Long> {
}
