package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Pelicula;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeliculaRepository extends CrudRepository<Pelicula,Integer> {

}
