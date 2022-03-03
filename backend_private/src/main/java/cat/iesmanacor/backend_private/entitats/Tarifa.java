package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(name="tarifa")
public class Tarifa implements Serializable {

    private static final long serialVersionUID=1L;

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

}