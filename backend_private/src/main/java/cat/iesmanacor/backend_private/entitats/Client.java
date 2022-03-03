package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="client")
@PrimaryKeyJoinColumn(name="id")
public class Client extends Usuari implements Serializable {

    public Client(Long id, String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat) {
        super(id, dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
    }

}
