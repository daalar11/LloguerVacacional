package cat.iesmanacor.backend_private.controller;

import cat.iesmanacor.backend_private.services.iReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/reserves")
public class ReservaController {

    @Autowired
    private iReservaService reservaService;

}
