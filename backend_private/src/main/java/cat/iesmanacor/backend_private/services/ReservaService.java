package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Reserva;
import cat.iesmanacor.backend_private.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService implements iReservaService{

    @Autowired
    private ReservaRepository reservaRepository;

    @Override
    public List<Reserva> listarTodos() {
        return (List<Reserva>) reservaRepository.findAll();
    }

    @Override
    public void guardar(Reserva r) {
        reservaRepository.save(r);
    }

    @Override
    public Reserva buscarPorId(Long idReserva) {
        return reservaRepository.findById(idReserva).orElse(null);
    }

    @Override
    public void eliminar(Long idReserva) {
        reservaRepository.deleteById(idReserva);
    }
}
