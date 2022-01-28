//Variable global que actua com a contador dels camps valids (Maxim 6)
var campsCorrectes = 0;

function validacioPropietat(){

    var pasaValidacio = false;

    if (campsCorrectes === 6){
        return true;
    }

    if (pasaValidacio === false){
        return false;
    }
}

//Funcio general que valida tots els camps de una propietat.
function validarFormPropietat(){
    validarNom();
    validarLocalitat();
    validarDireccio();
    validarDescompteSetmana();
    validarDescompteMes();
    validarPreuBase();
}

//Funcio que s'executa si les dades son correctes
function correcte(input, span){
    $(input).css("border", "2px solid green");
    $(span).css("color", "green");
    $(span).text("Bé");
}

//Funcio que s'executa si les dades no son incorrectes
function incorrecte(input, span, missatge){
    $(input).css("border", "2px solid red");
    $(span).css("color", "red");
    $(span).text(missatge);
}

//Funcio que valida el nom de la propietat.
function validarNom(){

    var nom = $("#nomPropietat").val();

    //El nom no pot estar buit ni valer null
    if (nom === "" || nom === null){

        incorrecte("#nomPropietat", "#validacioNom", "Aquest camp es obligatori")

    } else {

    correcte("#nomPropietat", "#validacioNom")
    campsCorrectes++;
    }
}

//Funcio que valida la localitat de la propietat.
function validarLocalitat(){

    var localitatvalue = $("#localitat").val();

    //El valor del select de localitats no ha de estar en 0 (Valor per defecte)
    if (localitatvalue == 0){

        incorrecte("#localitat", "#validacioLocalitat", "No has seleccionat cap localitat")

    } else {

    correcte("#localitat", "#validacioLocalitat")
    campsCorrectes++;
    }
}

function validarDireccio(){

    var direccio = $("#direccio").val();

    //Direccio no pot estar buit ni ser null
    if (direccio === "" || direccio === null){

        incorrecte("#direccio", "#validacioDireccio", "Aquest camp es obligatori")

    } else {
    correcte("#direccio", "#validacioDireccio")
    campsCorrectes++;
    }
}

//Funcio que valida el preu base de la propietat.
function validarPreuBase(){

    var preu = $("#preuBase").val();

    //Que el preu no sigui 0 ni null
    if (preu < 0 || preu == null){

        incorrecte("#preuBase", "#validacioPreu", "El preu de la propietat no pot ser negatiu.")
    } else {

    correcte("#preuBase", "#validacioPreu")
    campsCorrectes++;
    }
}

//Funcio que valida el descompte per setmana d'una propietat.
function validarDescompteSetmana(){

    var descM = $("#descompteSetmana").val();

    //No pot ser ni major a 100 ni menor a 0 ni null.
    if (descM > 100 || descM < 0 || descM == null){

        incorrecte("#descompteSetmana", "#validacioDescompteS", "El descompte ha d'estar entre el 0% i el 100%")
    } else {

    correcte("#descompteSetmana", "#validacioDescompteS")
    campsCorrectes++;
    }
}

//Funcio validar descompte per mes d'una propietat.
function validarDescompteMes(){

    var descS = $("#descompteMes").val();

    //No pot ser ni major a 100 ni menor a 0 ni null.
    if (descS < 0 || descS > 100 || descS == null){

        incorrecte("#descompteMes", "#validacioDescompteM", "El descompte ha d'estar entre el 0% i el 100%")

    } else {

    correcte("#descompteMes", "#validacioDescompteM")
    campsCorrectes++;
    }
}

