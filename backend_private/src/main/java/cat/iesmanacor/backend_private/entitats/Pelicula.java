package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="pelicules")
public class Pelicula implements Serializable {
    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String pelicula;
    private int any;
    private String director;
    private String genere;

}
