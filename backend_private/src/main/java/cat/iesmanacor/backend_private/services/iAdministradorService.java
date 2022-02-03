package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;

import java.util.List;

public interface iAdministradorService {
    List<Administrador> findAll();
    void save(Administrador admin);
    Administrador findById(String id);
    void delete (String id);
    Administrador findAdministradorByCorreu(String correu);
}
