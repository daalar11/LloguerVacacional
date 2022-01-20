package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Data
@Embeddable
public class CaracteristicaPropietatId implements Serializable {
    @Column(name = "id_car")
    private Long id_caracteristica;

    @Column(name="id_pro")
    private Long idPROPIETAT;

    public CaracteristicaPropietatId(Long id_caracteristica,Long idPROPIETAT){
        this.id_caracteristica=id_caracteristica;
        this.idPROPIETAT=idPROPIETAT;
    }
    public CaracteristicaPropietatId(){}
}
