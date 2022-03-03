package cat.iesmanacor.backend_private.entitats;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="politica_cancelacio")
public class PoliticaCancelacio  implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idpolitica_cancelacio", columnDefinition = "INT")
    private Long idPolitica;

    @ManyToOne
    @JoinColumn(name = "id_propietat") //Especificam el nom de la taula
    private Propietat propietat;

    @Column(name="dies")
    private int dies;

    @Column(name="perdut")
    private int perdut;

    @Column(name="activa", columnDefinition = "BIT")
    private boolean activa;

}
