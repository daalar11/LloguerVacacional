package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Habitacio;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabitacioRepository extends CrudRepository<Habitacio,Long> {

}
