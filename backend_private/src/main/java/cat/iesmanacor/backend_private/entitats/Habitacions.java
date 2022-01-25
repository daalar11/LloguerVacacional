package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="HABITACIONS")
public class Habitacions {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idHABITACIONS;
    @Column(columnDefinition = "bit")
    private int bany;

    private int llit_Doble;

    private int llit_simple;

    @ManyToOne //Relacio de molts a un ambn la taula propietat
    @JoinColumn(name = "id_propietat") //Especificam el nom de la taula
    private Propietat propietat;

    //Metodo to string para evitar el stackoverflow generado por Lombock
    @Override
    public String toString(){
        return "habitacio: " + idHABITACIONS +"TEST";
    }
}
