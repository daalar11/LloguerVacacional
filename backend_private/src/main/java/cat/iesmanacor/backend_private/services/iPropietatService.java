package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Propietat;
import java.util.List;

public interface iPropietatService {

   List<Propietat> listarTodos();
   void guardar(Propietat p);
   Propietat buscarPorId(Long idPropietat);
   void eliminar(Long idPropietat);


}
