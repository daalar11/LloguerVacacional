package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Usuari;
import cat.iesmanacor.backend_private.repository.AdministradorRepository;
import cat.iesmanacor.backend_private.services.iAdministradorService;
import cat.iesmanacor.backend_private.services.iPropietariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.mindrot.jbcrypt.BCrypt;

import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/autenticate")
public class UsuariController {

    @Autowired
    private iPropietariService propietariService;

    @Autowired
    private iAdministradorService administradorService;

    public String passwordHash(String pass){
        return BCrypt.hashpw(pass,BCrypt.gensalt());
    }

    //redirecciona a registrar
    @GetMapping("/register")
    public String register(Model model){
        Propietari propietari = new Propietari();
        model.addAttribute("propietari",propietari);
        return "/views/Login_Register/Register";
    }

    //guardar l'usuari aplicant un hash a la contrasenya
    @PostMapping("/save")
    public String save(@ModelAttribute Propietari propietari, Model model){
        propietari.setContrasenya(passwordHash(propietari.getContrasenya()));
        propietariService.save(propietari);
        return "redirect:/autenticate/register";
    }

    //redirecciona a loggin
    @GetMapping("/loggin")
    public String loggin(Model model){
        Usuari usuari = new Usuari();
        model.addAttribute("usuari",usuari);
        return "/views/Login_Register/Loggin";
    }

    //Comprova si l'usuari es administrador o propietari, si no es cap dels dos torna a pantalla loggin
    @PostMapping("/autenticate")
    public String autenticate(@ModelAttribute Usuari usuari, HttpSession httpSession){
        boolean autenticat = false;
        Usuari usuari2;
       if(administradorService.findAdministradorByCorreu(usuari.getCorreu())!=null){
           httpSession.setAttribute("rol","administrador");
           httpSession.setAttribute("usuari",usuari);
           usuari2 = administradorService.findAdministradorByCorreu(usuari.getCorreu());
           if(validate(usuari, usuari2)) {
               autenticat = true;
           }
       }else if(propietariService.findPropietariByCorreu(usuari.getCorreu())!=null){
           httpSession.setAttribute("rol","propietari");
           httpSession.setAttribute("usuari",usuari);
           usuari2 = propietariService.findPropietariByCorreu(usuari.getCorreu());
           if(validate(usuari, usuari2)) {
               autenticat = true;
           }
       }

        if(autenticat){
            return "redirect:/views/propietats/";
        }else{
            return "/views/Login_Register/Loggin";
        }

    }

    //comprova les contrasenya introduida amb la de la bd
    private boolean validate(Usuari usuari, Usuari usuari2) {
        return BCrypt.checkpw(usuari.getContrasenya(), usuari2.getContrasenya());
    }

}
