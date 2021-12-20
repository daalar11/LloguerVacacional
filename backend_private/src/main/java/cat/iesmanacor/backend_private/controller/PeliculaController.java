package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Pelicula;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class PeliculaController {
    @GetMapping("/pelicula")
    public String llistarPeliculas(){
        Pelicula pel= new Pelicula();

        return "mostrarPelicula";
    }
}
