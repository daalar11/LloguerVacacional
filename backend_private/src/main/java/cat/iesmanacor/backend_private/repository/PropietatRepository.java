package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropietatRepository extends CrudRepository<Propietat, Long> {
    List<Propietat> findPropietatByPropietari(Propietari propietari);
}
