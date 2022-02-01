package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Reserva;
import java.util.List;

public interface iReservaService {

    List<Reserva> listarTodos();
    void guardar(Reserva r);
    Reserva buscarPorId(Long idReserva);
    void eliminar(Long idReserva);

}
