package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="ADMINISTRADOR")
@PrimaryKeyJoinColumn(name="dni_usuari")
public class Administrador extends Usuari implements Serializable {

    private static final long serialVersionUID=1L;

    public Administrador() {
    }

    public Administrador(String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat) {
        super(dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
    }

}
