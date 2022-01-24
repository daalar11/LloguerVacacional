package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="TARIFA")
public class Tarifa implements Serializable {

    private static final long serialVersionUID=1L;

    //Atributs tarifa
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTARIFA;

    @ManyToOne
    @JoinColumn(name = "id_propietat")
    private Propietat propietat;

    @NotNull
    @Column(name="d_inici", nullable = false)
    private Date dataInici;

    @NotNull
    @Column(name="d_fi", nullable = false)
    private Date dataFinal;

    private boolean activa;

    //GETTERS/SETTERS/CONSTRUCTOR/toString

    public Tarifa() {
    }

    public Long getIdTARIFA() {
        return idTARIFA;
    }

    public void setIdTARIFA(Long idTARIFA) {
        this.idTARIFA = idTARIFA;
    }

    public Propietat getPropietat() {
        return propietat;
    }

    public void setPropietat(Propietat propietat) {
        this.propietat = propietat;
    }

    public Date getDataInici() {
        return dataInici;
    }

    public void setDataInici(Date dataInici) {
        this.dataInici = dataInici;
    }

    public Date getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(Date dataFinal) {
        this.dataFinal = dataFinal;
    }

    public boolean isActiva() {
        return activa;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }


}