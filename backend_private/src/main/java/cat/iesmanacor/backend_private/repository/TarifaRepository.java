package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Tarifa;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarifaRepository extends CrudRepository <Tarifa, Long> {

    List<Tarifa> findTarifasByPropietat(Long id);

    List<Tarifa> findAllByPropietat(Long id);



}
