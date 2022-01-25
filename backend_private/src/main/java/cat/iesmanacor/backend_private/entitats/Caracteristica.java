package cat.iesmanacor.backend_private.entitats;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "CARACTERISTIQUES")
@EqualsAndHashCode(exclude="propietats")
public class Caracteristica implements Serializable {

    private static final long serialVersionUID=1L;

    //Atributs pelicula

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    @Column(columnDefinition = "INT")
    private Long id_caracteristica;

    @Column(name="caracteristica", nullable=false)
    private String caracteristica;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL,mappedBy = "caracteristicas")
    //@JoinTable(
       // name= "caracteristiques_propietats",
        //joinColumns = @JoinColumn(name="id_car"),
        //inverseJoinColumns = @JoinColumn(name="id_pro"))
    Set <Propietat> propietats = new HashSet<>();

    @Override
    public String toString(){
        return "propietat: TEST";
    }
}
