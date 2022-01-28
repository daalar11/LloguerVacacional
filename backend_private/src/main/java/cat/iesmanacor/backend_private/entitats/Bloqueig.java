package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name="BLOQUEIG")
public class Bloqueig implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long idBLOQUEIG;

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

    //Constructor Buit
    public Bloqueig() {}

    //Getters i Setters
    public Long getIdBLOQUEIG() {
        return idBLOQUEIG;
    }
    public void setIdBLOQUEIG(Long idBLOQUEIG) {
        this.idBLOQUEIG = idBLOQUEIG;
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
}
