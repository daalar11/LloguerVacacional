package cat.iesmanacor.backend_private.entitats;

import javax.persistence.*;

@Entity
public class CaracteristicaPropietat {
    @EmbeddedId
    CaracteristicaPropietatId id;

    @ManyToOne
    @MapsId("id_caracteristica")
    @JoinColumn(name="id_caracteristica")
    Caracteristica caracteristica;

    @ManyToOne
    @MapsId("idPROPIETAT")
    @JoinColumn(name="idPROPIETAT")
    Propietat propietat;

    String valor;
}
