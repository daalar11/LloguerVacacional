package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.services.iPropietariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
public class HomeController {

    @Autowired
    private iPropietariService propietariService;

    //Metode controllador que simplement mapetga la pagina principal i l'hi envia un model (String)
    @GetMapping("")
    public String controllerHome(Model model, HttpSession httpSession){

        if (estaregistrat(httpSession)) {

            Propietari propietari;
            propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            model.addAttribute("id", propietari.getId());

        }
        model.addAttribute("home", "Pagina d'inici part privada");

        return "/views/home";
    }


    //Metode que comprova si exiteix la variable usuari a la sessio
    public boolean estaregistrat(HttpSession httpSession){
        return httpSession.getAttribute("usuari") != null;
    }

}
