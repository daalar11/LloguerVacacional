package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Propietari;

import java.util.List;

public interface iPropietariService {
    List<Propietari> findAll();
    void save(Propietari propietari);
    Propietari findById(String id);
    void delete (String id);
    Propietari findPropietariByCorreu(String correu);
}
