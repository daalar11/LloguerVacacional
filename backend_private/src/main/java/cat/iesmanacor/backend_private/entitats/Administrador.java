package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="administrador")
@PrimaryKeyJoinColumn(name="id")
public class Administrador extends Usuari implements Serializable {

    private static final long serialVersionUID=1L;

    public Administrador() {
    }

    public Administrador(Long id, String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat) {
        super(id, dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
    }
}
