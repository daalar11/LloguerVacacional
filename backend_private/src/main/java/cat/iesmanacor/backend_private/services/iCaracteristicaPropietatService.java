package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Caracteristica;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietat;
import cat.iesmanacor.backend_private.entitats.CaracteristicaPropietatId;
import cat.iesmanacor.backend_private.entitats.Habitacions;
import org.springframework.stereotype.Service;

import java.util.List;

public interface iCaracteristicaPropietatService {
    public List<CaracteristicaPropietat> findAll();

    public void save (CaracteristicaPropietat habitacio);

    public CaracteristicaPropietat findById(CaracteristicaPropietatId id);

    public void delete(CaracteristicaPropietatId id);
}
