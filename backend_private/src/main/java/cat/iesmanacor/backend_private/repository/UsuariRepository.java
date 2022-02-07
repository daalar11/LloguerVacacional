package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Usuari;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariRepository extends CrudRepository<Usuari, Long> {
}
