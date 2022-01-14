package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
@Data
@Embeddable
public class CaracteristicaPropietatId implements Serializable {
    @Column(name = "id_caracteristica")
    int id_caracteristica;

    @Column(name="idPROPIETAT")
    int idPROPIETAT;

    public CaracteristicaPropietatId(int id_caracteristica,int idPROPIETAT){
        this.id_caracteristica=id_caracteristica;
        this.idPROPIETAT=idPROPIETAT;
    }
    public CaracteristicaPropietatId(){}
}
