package cat.iesmanacor.backend_private.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class HomeController {


    //Metode controllador que simplement mapetga la pagina principal i l'hi envia un model (String)
    @GetMapping("home")
    public String controllerHome(Model model){

        model.addAttribute("home", "Aixo es la pagina principal (En manteniment)");

        return "/views/home";
    }

}
