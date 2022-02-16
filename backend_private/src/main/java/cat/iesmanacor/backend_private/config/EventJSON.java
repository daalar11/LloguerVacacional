package cat.iesmanacor.backend_private.config;

import lombok.Data;

@Data
public class EventJSON {

    //Aquesta classe es l'estructura final de un event

    //Propietats que te un event JSON
    private String id;
    private String title;
    private String start;
    private String end;
    private String url;
    private float preu;


}
