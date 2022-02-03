package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Administrador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorRepository extends CrudRepository<Administrador,String> {
    Administrador findAdministradorByCorreu(String correu);
}
