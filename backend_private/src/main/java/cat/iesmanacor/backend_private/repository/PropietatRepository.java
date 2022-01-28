package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Propietat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropietatRepository extends CrudRepository<Propietat, Long> {
}
