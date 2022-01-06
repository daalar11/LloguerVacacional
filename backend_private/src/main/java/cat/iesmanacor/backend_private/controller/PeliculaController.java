package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Pelicula;
import cat.iesmanacor.backend_private.services.iPeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/views/pelicules")
public class PeliculaController {
    @Autowired
    private iPeliculaService peliculaService;

    @GetMapping("/pelicula")
    public String llistarPeliculas(Model model){
        List<Pelicula> llistaPelicula= peliculaService.findAll();

    model.addAttribute("titulo","Llista de pelicules");
    model.addAttribute("pelicules",llistaPelicula);
        return "views/pelicules/mostraPelicula";
    }
}
