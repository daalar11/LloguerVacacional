package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

//Clase filla de la generalitzacio
@Entity
@PrimaryKeyJoinColumn(name="id")    //Indica quina columna de la filla es la que fa referencia a dni
public class Propietari extends Usuari implements Serializable {

    private static final long serialVersionUID=1L;

    private String descripcio;

    @OneToMany(mappedBy = "propietari")
    private List<Propietat> propietat;

    public Propietari() {
    }

    public Propietari(Long id, String dni, String nom, String llinatge1, String llinatge2, String correu, String contrasenya, int eliminat, String descripcio, List<Propietat> propietat) {
        super(id, dni, nom, llinatge1, llinatge2, correu, contrasenya, eliminat);
        this.descripcio = descripcio;
        this.propietat = propietat;
    }

    public String getDescripcio() {
        return descripcio;
    }

    public void setDescripcio(String descripcio) {
        this.descripcio = descripcio;
    }

    public List<Propietat> getPropietat() {
        return propietat;
    }

    public void setPropietat(List<Propietat> propietat) {
        this.propietat = propietat;
    }
}
