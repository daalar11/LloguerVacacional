package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@PrimaryKeyJoinColumn(name="dni_cli")
public class Client extends Usuari implements Serializable {

    public Client(String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat) {
        super(dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
    }

    public Client(){

    }

}
