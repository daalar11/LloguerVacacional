package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="HABITACIONS")
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

    //Constructor Buit
    public Habitacio() {}

    //Getters I Setters
    public Long getIdHABITACIONS() {
        return idHABITACIONS;
    }
    public void setIdHABITACIONS(Long idHABITACIONS) {
        this.idHABITACIONS = idHABITACIONS;
    }
    public int getBany() {
        return bany;
    }
    public void setBany(int bany) {
        this.bany = bany;
    }
    public int getLlit_Doble() {
        return llit_Doble;
    }
    public void setLlit_Doble(int llit_Doble) {
        this.llit_Doble = llit_Doble;
    }
    public int getLlit_simple() {
        return llit_simple;
    }
    public void setLlit_simple(int llit_simple) {
        this.llit_simple = llit_simple;
    }
    public Propietat getPropietat() {
        return propietat;
    }
    public void setPropietat(Propietat propietat) {
        this.propietat = propietat;
    }
}
