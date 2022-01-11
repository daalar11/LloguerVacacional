package cat.iesmanacor.backend_private.services;

import cat.iesmanacor.backend_private.entitats.Propietat;

import java.util.List;

public interface PropietatServeiInterface {

   public List<Propietat> listarTodos();
   public void guardar(Propietat p);
   public Propietat buscarPorId(Long idPropietat);
   public void eliminar(Long idPropietat);



}
