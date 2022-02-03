package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropietariRepository extends CrudRepository<Propietari,String> {
    Propietari findPropietariByCorreu(String correu);
}
