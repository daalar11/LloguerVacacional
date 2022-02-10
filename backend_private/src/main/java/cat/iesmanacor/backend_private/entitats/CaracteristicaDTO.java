package cat.iesmanacor.backend_private.entitats;

import lombok.Data;

@Data
public class CaracteristicaDTO {

    Caracteristica caracteristica;
    boolean contain;

    public CaracteristicaDTO(Caracteristica caracteristica, boolean contain) {
        this.caracteristica = caracteristica;
        this.contain = contain;
    }

}
