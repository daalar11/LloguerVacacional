package cat.iesmanacor.backend_private.repository;

import cat.iesmanacor.backend_private.entitats.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client,String> {
}
