package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;

@Entity
public class Caracteristica {
    private static final long serialVersionUID=1L;

    //Atributs pelicula

    @Id //Indicam quin es el camp identificador
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Indicam com es genera l'identificador (En aquest cas AUTO_INCREMENT)
    private Long id_caracteristica;

    @Column(name="nom_localitat", nullable=false)
    private String caracteristica;
}
