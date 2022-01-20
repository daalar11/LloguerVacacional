package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Propietat;
import org.hibernate.annotations.SelectBeforeUpdate;
import org.springframework.stereotype.Service;

import java.util.List;

public interface iPropietatService {

   public List<Propietat> listarTodos();
   public void guardar(Propietat p);
   public Propietat buscarPorId(Long idPropietat);
   public void eliminar(Long idPropietat);



}
