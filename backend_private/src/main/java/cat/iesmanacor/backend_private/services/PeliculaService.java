package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Pelicula;
import cat.iesmanacor.backend_private.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PeliculaService implements iPeliculaService{
    @Autowired
    private PeliculaRepository peliculaData;
    @Override
    public List<Pelicula> findAll() {
        return (List<Pelicula>) peliculaData.findAll();
    }

    @Override
    public void save(Pelicula pelicula) {
        peliculaData.save(pelicula);
    }

    @Override
    public Pelicula findById(Integer id) {
        return peliculaData.findById(id).orElse(null);
    }

    @Override
    public void delete(Integer id) {
        peliculaData.deleteById(id);
    }
}
