package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="POLITICA_CANCELACIO")
public class PoliticaCancelacio  implements Serializable {
    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idPOLITICA_CANCELACIO",columnDefinition = "INT")
    private Long idPolitica;

    @ManyToOne
    @JoinColumn(name = "id_propietat") //Especificam el nom de la taula
    private Propietat propietat;

    @Column(name="dies")
    private int dies;

    @Column(name="perdut")
    private int perdut;

    @Column(name="activa",columnDefinition = "BIT")
    private boolean activa;

    public PoliticaCancelacio(Long idPolitica, Propietat propietat, int dies, int perdut, boolean activa) {
        this.idPolitica = idPolitica;
        this.propietat = propietat;
        this.dies = dies;
        this.perdut = perdut;
        this.activa = activa;
    }

    public PoliticaCancelacio(){}

    public Long getIdPolitica() {
        return idPolitica;
    }

    public void setIdPolitica(Long idPolitica) {
        this.idPolitica = idPolitica;
    }

    public Propietat getPropietat() {
        return propietat;
    }

    public void setPropietat(Propietat propietat) {
        this.propietat = propietat;
    }

    public int getDies() {
        return dies;
    }

    public void setDies(int dies) {
        this.dies = dies;
    }

    public int getPerdut() {
        return perdut;
    }

    public void setPerdut(int perdut) {
        this.perdut = perdut;
    }

    public boolean getActiva() {
        return activa;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }
}
