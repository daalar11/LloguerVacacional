package cat.iesmanacor.backend_private.entitats;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Data //Longbok afegeix setters, getters i el constructor buit.
@Entity //Entitat (se menejara amb una taula)
@Table(name="localitat") //Si la taula no s'escriu exactament igual a la classe s'ha de posar el nom de la taula (NO ES EL CAS)
public class Localitat implements Serializable {

    private static final long serialVersionUID=1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    @Column(columnDefinition = "INT")
    private Long idLOCALITAT;

    @Column(name="nom_localitat", nullable=false)
    private String nomLocalitat;

    private String cp_localitat;

}