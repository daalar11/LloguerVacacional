package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietat;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietatId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaPropietatRespository extends CrudRepository<CaracteristicaPropietat, CaracteristicaPropietatId> {
}
