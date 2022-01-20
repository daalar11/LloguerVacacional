package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietat;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietatId;
import cat.iesmanacor.backend_private.repository.CaracteristicaPropietatRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CaracteristicaPropietatService implements iCaracteristicaPropietatService{
    @Autowired
    private CaracteristicaPropietatRespository carPro;

    @Override
    public List<CaracteristicaPropietat> findAll() {
        return (List<CaracteristicaPropietat>) carPro.findAll();
    }

    @Override
    public void save(CaracteristicaPropietat caracteristica) {
        carPro.save(caracteristica);
    }

    @Override
    public CaracteristicaPropietat findById(CaracteristicaPropietatId id) {
        return carPro.findById(id).orElse(null);
    }

    @Override
    public void delete(CaracteristicaPropietatId id) {
        carPro.deleteById(id);
    }
}
