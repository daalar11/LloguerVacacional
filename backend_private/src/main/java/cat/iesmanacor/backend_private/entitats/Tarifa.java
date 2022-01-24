package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="TARIFA")
public class Tarifa implements Serializable {

    private static final long serialVersionUID=1L;

    //Atributs tarifa
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTARIFA;

    @ManyToOne
    @JoinColumn(name = "idPropietat", nullable = false)
    private Propietat propietat;

    @NotNull
    @Column(name="d_inici", nullable = false)
    private Date dataInici;

    @NotNull
    @Column(name="d_fi", nullable = false)
    private Date dataFinal;

    private boolean activa;

}