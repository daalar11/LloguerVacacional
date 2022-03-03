package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="habitacions")
public class Habitacio implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT")
    private Long idHABITACIONS;

    @Column(columnDefinition = "bit")
    private int bany;

    private int llit_Doble;

    private int llit_simple;

    @ManyToOne //Relacio de molts a un ambn la taula propietat
    @JoinColumn(name = "id_propietat") //Especificam el nom de la taula
    private Propietat propietat;

    @Override
    public String toString() {
        return "Habitacio{" +
                "idHABITACIONS=" + idHABITACIONS +
                ", bany=" + bany +
                ", llit_Doble=" + llit_Doble +
                ", llit_simple=" + llit_simple +
                ", propietat=" + propietat +
                '}';
    }

}
