package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="TARIFA")
public class Tarifa implements Serializable {

    private static final long serialVersionUID=1L;

    //Atributs tarifa
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long idTARIFA;

    private float preu;

    @ManyToOne
    @JoinColumn(name = "id_propietat")
    private Propietat propietat;

    @NotNull
    @Column(name="d_inici", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataInici;

    @NotNull
    @Column(name="d_fi", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataFinal;

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

    public float getPreu() {
        return preu;
    }

    public void setPreu(float preu) {
        this.preu = preu;
    }

    public Propietat getPropietat() {
        return propietat;
    }

    public void setPropietat(Propietat propietat) {
        this.propietat = propietat;
    }

    public LocalDate getDataInici() {
        return dataInici;
    }

    public void setDataInici(LocalDate dataInici) {
        this.dataInici = dataInici;
    }

    public LocalDate getDataFinal() {
        return dataFinal;
    }

    public void setDataFinal(LocalDate dataFinal) {
        this.dataFinal = dataFinal;
    }

    public boolean isActiva() {
        return activa;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }
}