//Funcio mapa javascript+
function myMap() {
    //Aquesta variable definira les variables del mapa

    /*let lat = [[${propietat.x}]];
    let lon = [[${propietat.y}]];*/

    var myCenter = new google.maps.LatLng(39.602776, 3.006384);

    var mapProp= {
        //Center -> Especifica a on centrar el mapa (Lat, Long)
        center: myCenter,
        //Zoom -> Especifica el nivell de zoom del mapa
        zoom:9,
        //Defineix el tipo de mapa (HYBRID, ROADMAP, SATELLITE, TERRAIN)
        //Setter -> map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        mapTypeId: google.maps.MapTypeId.HYBRID,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true

    };

    //Aquesta linia crea un mapa dins l'element amb id googleMap
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp)

    //Afegeix un marker amb animacio (Animacio = Botar (Bounce))
    var marker = new google.maps.Marker({
        position: myCenter,
        animation:google.maps.Animation.BOUNCE
    });
    marker.setMap(map);


    //Obrir una finestra quan es clicki el marcador
    var infowindow = new google.maps.InfoWindow({
        content:"Localitzacio de la propietat."
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    //Funcio que afegeix un marcador on clicki l'usuari.
    function placeMarker(map, location) {

        if (marker && marker.setMap) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            position: location,
            map: map,
            animation:google.maps.Animation.BOUNCE
        });

        /*S'obri una finestreta damunt el marker amb informaciĂł de les coordenades seleccionades.
        var infowindow = new google.maps.InfoWindow({
          content: 'Les coordenades de la teva propietat son <br> Latitud: '
                  + location.lat() +
                  '<br>Longitud: '
                  + location.lng()
        });
        infowindow.open(map, marker);*/

        $("#latitud").val(location.lat());
        $("#longitud").val(location.lng());

    }
    //Coloca el marcador i obre una finestra per cada marcador.
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);
    });
    // Zoom fins a 9 quan es clica el marker
    google.maps.event.addListener(marker,'click',function() {
        map.setZoom(9);
        map.setCenter(marker.getPosition());
    });

}//Fi funcio googleMap