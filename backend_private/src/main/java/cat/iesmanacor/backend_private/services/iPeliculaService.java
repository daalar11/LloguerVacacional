package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Pelicula;

import java.util.List;

public interface iPeliculaService {
    public List<Pelicula> findAll();
    public void save (Pelicula pelicula);
    public Pelicula findById(Integer id);
    public void delete(Integer id);
}
