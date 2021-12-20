package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="pelicules")
public class Pelicula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titol;
    private int any;
    private String director;
    private String genere;
}
