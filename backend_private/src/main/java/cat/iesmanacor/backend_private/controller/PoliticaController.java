package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.entitats.PoliticaCancelacio;
import cat.iesmanacor.backend_private.entitats.Propietari;
import cat.iesmanacor.backend_private.entitats.Propietat;
import cat.iesmanacor.backend_private.services.iPoliticaService;
import cat.iesmanacor.backend_private.services.iPropietariService;
import cat.iesmanacor.backend_private.services.iPropietatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/views/propietats/politiques")
public class PoliticaController {

    @Autowired
    private iPoliticaService politicaService;

    @Autowired
    private iPropietatService propietatService;

    @Autowired
    private iPropietariService propietariService;

    @ModelAttribute
    public void addAttributes(Model model, HttpSession httpSession) {

        if (httpSession.getAttribute("usuari") != null){
            Propietari propietari = propietariService.findPropietariByCorreu(((Propietari) httpSession.getAttribute("usuari")).getCorreu());
            model.addAttribute("idUsuari", propietari.getId());
        }
    }

    @PostMapping("/save")
    public String save(@ModelAttribute PoliticaCancelacio politica){

        politicaService.save(politica);
        Long idPropietat = politica.getPropietat().getIdPROPIETAT();

        return "redirect:/views/propietats/configurar/"+idPropietat;
    }

    @GetMapping("/afegir/{idPROPIETAT}")
    public String afegir(@ModelAttribute("idUsuari") Long idUsuari, Model model, @PathVariable("idPROPIETAT") Long idPropietat){
        Propietat listPropietat = propietatService.buscarPorId(idPropietat);
        model.addAttribute("propietats",listPropietat);
        PoliticaCancelacio politica = new PoliticaCancelacio();
        model.addAttribute("politica",politica);

        //Model que passa l'ID de l'USUARI (Necessari en tot moment per el link de propietats del header)
        model.addAttribute("id", idUsuari);
        if(!idUsuari.equals(listPropietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
        return "/views/politiques/frmCrearPolitica";
    }

    @GetMapping("/edit/{idPROPIETAT}/{idPolitica}")
    public String edit(@ModelAttribute("idUsuari") Long idUsuari, Model model, @PathVariable("idPROPIETAT") Long idPropietat,@PathVariable("idPolitica")Long idPolitica){
        Propietat listPropietat = propietatService.buscarPorId(idPropietat);
        model.addAttribute("propietats",listPropietat);
        PoliticaCancelacio politica =politicaService.findById(idPolitica);
        model.addAttribute("politica",politica);

        //Model que passa l'ID de l'USUARI (Necessari en tot moment per el link de propietats del header)
        model.addAttribute("id", idUsuari);
        if(!idUsuari.equals(listPropietat.getPropietari().getId())){
            return "/views/errorAutenticacio";
        }
        return "/views/politiques/frmCrearPolitica";
    }

    @GetMapping("/delete/{idPROPIETAT}/{idPolitica}")
    public String delete(@PathVariable("idPolitica") Long idPolitica,@PathVariable("idPROPIETAT") Long idPropietat){
        politicaService.delete(idPolitica);
        return "redirect:/views/propietats/configurar/" +idPropietat;
    }
}
