
    var campsCorrectes = 0;

    function validacio(){

        var pasaValidacio = false;

        if (campsCorrectes == 6){
        return true;
        }

        if (pasaValidacio == false){
        return false;
        }
    }

    function validarForm(){
    validarNom();
    validarLocalitat();
    validarDireccio();
    validarDescompteSetmana();
    validarDescompteMes();
    validarPreuBase();
}

    function correcte(input, span){
    $(input).css("border", "2px solid green");
    $(span).css("color", "green");
    $(span).text("Bé");
}

    function incorrecte(input, span, missatge){
    $(input).css("border", "2px solid red");
    $(span).css("color", "red");
    $(span).text(missatge);
}

    function validarNom(){

    var nom = $("#nomPropietat").val();

    if (nom === "" || nom === null){
    incorrecte("#nomPropietat", "#validacioNom", "Aquest camp es obligatori")
} else {
    correcte("#nomPropietat", "#validacioNom")
    campsCorrectes++;
}
}

    function validarLocalitat(){
    var localitatvalue = $("#localitat").val();

    if (localitatvalue == 0){
    incorrecte("#localitat", "#validacioLocalitat", "No has seleccionat cap localitat")
} else {
    correcte("#localitat", "#validacioLocalitat")
    campsCorrectes++;
}
}

    function validarDireccio(){

    var direccio = $("#direccio").val();

    if (direccio === "" || direccio === null){
    incorrecte("#direccio", "#validacioDireccio", "Aquest camp es obligatori")
} else {
    correcte("#direccio", "#validacioDireccio")
    campsCorrectes++;
}
}

    function validarPreuBase(){

    var preu = $("#preuBase").val();

    if (preu < 0 || preu == null){
    incorrecte("#preuBase", "#validacioPreu", "El preu de la propietat no pot ser negatiu.")
} else {
    correcte("#preuBase", "#validacioPreu")
    campsCorrectes++;
}

}

    function validarDescompteSetmana(){

    var descM = $("#descompteSetmana").val();

    if (descM > 100 || descM < 0 || descM == null){
    incorrecte("#descompteSetmana", "#validacioDescompteS", "El descompte ha d'estar entre el 0% i el 100%")
} else {
    correcte("#descompteSetmana", "#validacioDescompteS")
    campsCorrectes++;
}
}

    function validarDescompteMes(){

    var descS = $("#descompteMes").val();

    if (descS < 0 || descS > 100 || descS == null){
    incorrecte("#descompteMes", "#validacioDescompteM", "El descompte ha d'estar entre el 0% i el 100%")
} else {
    correcte("#descompteMes", "#validacioDescompteM")
    campsCorrectes++;
}
}

