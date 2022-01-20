package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="caracteristiques_propietats")
public class CaracteristicaPropietat {
    @EmbeddedId
    private CaracteristicaPropietatId id;

    @ManyToOne
    @MapsId("id_caracteristica")
    @JoinColumn(name="id_car", insertable = false,updatable = false)
    private Caracteristica caracteristica;

    @ManyToOne
    @MapsId("idPROPIETAT")
    @JoinColumn(name="id_pro", insertable = false,updatable = false)
    private Propietat propietat;

    @Column
    private String valor;

    public CaracteristicaPropietat (CaracteristicaPropietatId id,Caracteristica caracteristica, Propietat propietat,String valor){
        this.id=id;
        this.caracteristica=caracteristica;
        this.propietat=propietat;
        this.valor=valor;
    }

    public CaracteristicaPropietat (){}
}
