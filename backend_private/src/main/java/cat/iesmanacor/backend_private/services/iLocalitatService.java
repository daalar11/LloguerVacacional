package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Localitat;
import org.springframework.stereotype.Service;

import java.util.List;

public interface iLocalitatService {

    List<Localitat> llistarLocalitats();

}
