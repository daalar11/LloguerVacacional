package cat.iesmanacor.backend_private.entitats;

import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "CARACTERISTIQUES")
@EqualsAndHashCode(exclude="propietats")
public class Caracteristica implements Serializable {

    private static final long serialVersionUID=1L;

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    @Column(name = "id_caracteristica" , columnDefinition = "INT")
    private Long idCaracteristica;

    @Column(name="caracteristica", nullable=false)
    private String caracteristica;

    //@JoinTable(
    //name= "caracteristiques_propietats",
    //joinColumns = @JoinColumn(name="id_car"),
    //inverseJoinColumns = @JoinColumn(name="id_pro"))
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL,mappedBy = "caracteristicas")
    List <Propietat> propietats = new ArrayList<>();

    @Override
    public String toString() {
        return "Caracteristica{" +
                "idCaracteristica=" + idCaracteristica +
                ", caracteristica='" + caracteristica + '\'' +
                ", propietats=" + propietats +
                '}';
    }
}
