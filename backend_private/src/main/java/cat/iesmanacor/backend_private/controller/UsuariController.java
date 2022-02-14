package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.Administrador;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Usuari;
import cat.iesmanacor.backend_private.services.iAdministradorService;
import cat.iesmanacor.backend_private.services.iPropietariService;
import cat.iesmanacor.backend_private.services.iUsuariService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.mindrot.jbcrypt.BCrypt;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/autenticate")
public class UsuariController {

    @Autowired
    private iPropietariService propietariService;

    @Autowired
    private iAdministradorService administradorService;

    @Autowired
    private iUsuariService usuariService;

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

    public boolean comprovacioCorreuDni(List<Usuari> llistaUsuaris, Propietari propietari){
        boolean repeticio= false;
        for (Usuari usuaris : llistaUsuaris) {
            if (usuaris.getDni().equals(propietari.getDni()) || usuaris.getCorreu().equals(propietari.getCorreu())) {
                repeticio = true;
                break;
            }
        }
        return repeticio;
    }

    //guardar l'usuari aplicant un hash a la contrasenya
    @PostMapping("/save")
    public String save(@ModelAttribute Propietari propietari, Model model){
        List<Usuari> llistaUsuaris = usuariService.findAll();
        if(comprovacioCorreuDni(llistaUsuaris,propietari)){
            model.addAttribute("repeticioDades","Aquest correu o DNI ja esta registrat.");
            return "/views/Login_Register/Register";
        }
        propietari.setContrasenya(passwordHash(propietari.getContrasenya()));
        propietariService.save(propietari);

        return "redirect:/autenticate/loggin";
    }

    //redirecciona a loggin
    @GetMapping("/loggin")
    public String loggin(Model model){
        Usuari usuari = new Usuari();
        model.addAttribute("usuari",usuari);
        return "/views/Login_Register/Loggin";
    }
    @GetMapping("/loggout")
    public String loggin(HttpSession httpSession){
        httpSession.invalidate();
        return "redirect:/autenticate/loggin";
    }

    //Comprova si l'usuari es administrador o propietari, si no es cap dels dos torna a pantalla loggin
    @PostMapping("/autenticate")
    public String autenticate(@ModelAttribute Usuari usuari, HttpSession httpSession,Model model){
        boolean autenticat = false;
        Usuari usuari2;
//       if(administradorService.findAdministradorByCorreu(usuari.getCorreu())!=null){
//           Administrador admin = new Administrador();
//           BeanUtils.copyProperties(usuari,admin);
//           httpSession.setAttribute("rol","administrador");
//           httpSession.setAttribute("usuari",usuari);
//           usuari2 = administradorService.findAdministradorByCorreu(usuari.getCorreu());
//           //if(validate(usuari, usuari2)) {
//               usuari=usuari2;
//               autenticat = true;
//        //   }
//       }else
         if(propietariService.findPropietariByCorreu(usuari.getCorreu())!=null){
           Propietari propietari = new Propietari();
           BeanUtils.copyProperties(usuari,propietari);
           httpSession.setAttribute("rol","propietari");
           httpSession.setAttribute("usuari",propietari);

           usuari2 = propietariService.findPropietariByCorreu(usuari.getCorreu());
           if(validate(usuari, usuari2)) {
               usuari=usuari2;
               autenticat = true;
           }
       }else{
           model.addAttribute("registrat","Aquest usuari no esta registrat");
       }

        if(autenticat){
            return "redirect:/views/propietats/"+usuari.getId();
        }else{
            return "/views/Login_Register/Loggin";
        }

    }

    //comprova les contrasenya introduida amb la de la bd
    private boolean validate(Usuari usuari, Usuari usuari2) {
        return BCrypt.checkpw(usuari.getContrasenya(), usuari2.getContrasenya());
    }

}
