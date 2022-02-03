package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;
//Clase filla de la generalitzacio
@Entity
@PrimaryKeyJoinColumn(name="dni_propietari")    //Indica quina columna de la filla es la que fa referencia a dni
public class Propietari extends Usuari implements Serializable {

    private static final long serialVersionUID=1L;

    private String descripcio;

    public Propietari() {
    }

    public Propietari(String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat,String descripcio) {
        super(dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
        this.descripcio = descripcio;
    }

    public String getDescripcio() {
        return descripcio;
    }

    public void setDescripcio(String descripcio) {
        this.descripcio = descripcio;
    }
}
