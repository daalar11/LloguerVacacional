package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Usuari;

import java.util.List;

public interface iUsuariService {
    List<Usuari> findAll();
}
