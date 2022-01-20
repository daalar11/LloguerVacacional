package cat.iesmanacor.backend_private.entitats;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Data //Longbok afegeix setters, getters i el constructor buit.
@Entity //Entitat (se menejara amb una taula)
@Table(name="PROPIETAT") //Si la taula no s'escriu exactament igual a la classe s'ha de posar el nom de la taula (NO ES EL CAS)
public class Propietat implements Serializable {

    private static final long serialVersionUID=1L;

    //Atributs pelicula

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    private Long idPROPIETAT;

    @Column(name="nom_propietat", nullable=false)
    private String nomPropietat;

    @ManyToOne //Relacio de molts a un ambn la taula municipi
    @JoinColumn(name = "id_localitat") //Especificam el nom de la taula
    private Localitat localitat;

    private String normes;

    //One to many para poder leer las habitaciones de una propietat
    @OneToMany(mappedBy = "propietat")
    private List<Habitacions> habitacions;


    private String direccio;

    @NotNull
    @Column(name="preu_base", nullable=false)
    private int preuBase;

    @NotNull
    @Column(name="descompte_setmana", nullable=false)
    private int descompteSetmana;

    @NotNull
    @Column(name="descompte_mes", nullable=false)
    private int descompteMes;

    private boolean activa;

    @Override
    public String toString(){
        return "propietat: " + idPROPIETAT +"TEST";
    }


}