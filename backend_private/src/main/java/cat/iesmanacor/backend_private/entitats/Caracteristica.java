package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "CARACTERISTIQUES")
public class Caracteristica {
    private static final long serialVersionUID=1L;

    //Atributs pelicula

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    private Long id_caracteristica;

    @Column(name="caracteristica", nullable=false)
    private String caracteristica;

    @OneToMany(mappedBy = "caracteristica")
    private Set<CaracteristicaPropietat> caracteristiques = new HashSet<>();

}
