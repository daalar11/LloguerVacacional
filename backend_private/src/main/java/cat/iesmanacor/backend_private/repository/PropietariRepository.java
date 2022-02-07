package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropietariRepository extends CrudRepository<Propietari,Long> {
    Propietari findPropietariByCorreu(String correu);

}
