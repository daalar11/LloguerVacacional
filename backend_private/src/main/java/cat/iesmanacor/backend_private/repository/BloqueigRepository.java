package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Bloqueig;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloqueigRepository extends CrudRepository <Bloqueig, Long> {
}
