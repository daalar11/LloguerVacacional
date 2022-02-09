/* ---------------------VARIABLES I METODES GLOBALS--------------------- */

//Variable global que actua com a contador dels camps valids (Maxim 6)
var campsCorrectes = 0;
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

function validarData(input, validacio, missatge){

    var dataFinal = $(input).val();

    if (dataFinal === "" || dataFinal === null){
        incorrecte(input, validacio, missatge)
    } else {
        correcte(input, validacio)
        campsCorrectes++;
    }
}

/* ---------------------CAMPS PROPIETAT--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioPropietat(){

    var pasaValidacio = false;

    if (campsCorrectes === 9){return true;}
    if (pasaValidacio === false){return false;}
}

//Funcio general que valida tots els camps de una propietat.
function validarFormPropietat(){
    validarNomPropietat();
    validarLocalitatPropietat();
    validarDireccioPropietat();
    validarPreuBasePropietat();
    validarBanysPropietat();
    validarDescompteSetmanaPropietat();
    validarDescompteMesPropietat();
    validarLatitutPropietat();
    validarLongitutPropietat();
}

//Funcio que valida el nom de la propietat.
function validarNomPropietat(){

    var nom = $("#nomPropietat").val();

    //El nom ha de tenir minim 3 lletres.
    if (nom.length <= 3){
        incorrecte("#nomPropietat", "#validacioNom", "El nom de la propietat és obligatori i ha de tenir almenys 3 caracters")
    } else {
        correcte("#nomPropietat", "#validacioNom")
        campsCorrectes++;
    }
}

//Funcio que valida la localitat de la propietat.
function validarLocalitatPropietat(){

    var localitatvalue = $("#localitat").val();

    //El valor del select de localitats no ha de estar en 0 (Valor per defecte)
    if (localitatvalue == 0){
        incorrecte("#localitat", "#validacioLocalitat", "No has seleccionat cap localitat")
    } else {
        correcte("#localitat", "#validacioLocalitat")
        campsCorrectes++;
    }
}

function validarDireccioPropietat(){

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
function validarPreuBasePropietat(){

    var preu = $("#preuBase").val();

    //Que el preu no sigui 0 ni null
    if (preu < 0 || preu == null){
        incorrecte("#preuBase", "#validacioPreu", "Especificar el preu base per dia de la propietat es obligatori i no pot tenir valor negatiu")
    } else {
        correcte("#preuBase", "#validacioPreu")
        campsCorrectes++;
    }
}

//Funcio validar els banys comunitaris d'una propietat
function validarBanysPropietat(){

    var banys = $("#banys").val();

    //No pot ser ni major a 100 ni menor a 0 ni null.
    if (banys < 0 || banys > 100 || banys == null){
        incorrecte("#banys", "#validacioBanys", "Camp obligatori")
    } else {
        correcte("#banys", "#validacioBanys")
        campsCorrectes++;
    }
}

//Funcio que valida el descompte per setmana d'una propietat.
function validarDescompteSetmanaPropietat(){

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
function validarDescompteMesPropietat(){

    var descS = $("#descompteMes").val();

    //No pot ser ni major a 100 ni menor a 0 ni null.
    if (descS < 0 || descS > 100 || descS == null){
        incorrecte("#descompteMes", "#validacioDescompteM", "El descompte ha d'estar entre el 0% i el 100%")
    } else {
        correcte("#descompteMes", "#validacioDescompteM")
        campsCorrectes++;
    }
}

//Funcio que valida les coordenades de la propietat.
function validarLatitutPropietat(){

    var lat = $("#latitud").val();
    console.log(lat);

    //No pot ser null.
    if (lat.length <= 0){
        incorrecte("#latitud", "#validaciolat", "Has d'indicar la posició de la propietat al mapa!")
    } else {
        correcte("#latitud", "#validaciolat")
        campsCorrectes++;
    }
}

//Funcio que valida les coordenades de la propietat.
function validarLongitutPropietat(){

    var lon = $("#longitud").val();
    console.log(lon);

    //No pot ser null.
    if (lon <= 0){
        incorrecte("#longitud", "#validaciolon", "Has d'indicar la posició de la propietat al mapa!")
    } else {
        correcte("#longitud", "#validaciolon")
        campsCorrectes++;
    }
}

/* ---------------------CAMPS HABITACIO--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioHabitacio(){

    var pasaValidacio = false;

    if (campsCorrectes === 3){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormHabitacio(){

    campsCorrectes = 0;

    validarLlitsDobles();
    validarLlitsSimples();
    validarLlitsNulls();


}

function validarLlitsNulls(){

    var doble = $("#llitDoble").val();
    var simple = $("#llitSimple").val();

    //Que el preu no sigui 0 ni null
    if (doble == 0 && simple == 0){
        incorrecte("#errorLlits", "#errorLlits", "Les habitacions han de tenir minim un llit");
    } else {
        campsCorrectes++;
    }

}

function validarLlitsDobles(){

    var doble = $("#llitDoble").val();

    //Que el preu no sigui 0 ni null
    if (doble < 0 || doble == null){
        incorrecte("#llitDoble", "#validacioDoble", "Numero d'habitacions no valid");
    } else {
        campsCorrectes++;
    }
}

function validarLlitsSimples(){

    var simple = $("#llitSimple").val();

    //Que el preu no sigui 0 ni null
    if (simple < 0 || simple == null){
        incorrecte("#llitSimple", "#validacioSimple", "Numero d'habitacions no valid");
    } else {
        campsCorrectes++;
    }
}

/* ---------------------CAMPS TARIFA--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioTarifa(){

    var pasaValidacio = false;

    if (campsCorrectes === 3){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormTarifa(){

    campsCorrectes = 0;

    validarData("#dataIni", "#validacioDataIni", "Data No Valida" );
    validarData("#dataFi", "#validacioDataFi", "Data No Valida" );
    validarPreuTarifa();

}

//Funcio que valida el preu de la tarifa
function validarPreuTarifa(){

    var preu = $("#preu").val();

    //Que el preu no sigui 0 ni null
    if (preu < 0 || preu == null){
        incorrecte("#preu", "#validacioPreu", "Preu de tarifació no valid")
    } else {
        correcte("#preu", "#validacioPreu")
        campsCorrectes++;
    }
}

/* ---------------------CAMPS BLOQUEIG--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioBloqueig(){

    var pasaValidacio = false;

    if (campsCorrectes === 2){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormBloqueig(){

    campsCorrectes = 0;

    validarData("#dataIni", "#validacioDataIni", "Data No Valida" );
    validarData("#dataFi", "#validacioDataFi", "Data No Valida" );

}

/* ---------------------CAMPS POLITIQUES--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioPolitica(){

    var pasaValidacio = false;

    if (campsCorrectes === 2){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormPolitica(){

    campsCorrectes = 0;

    validarDiesAntelacio();
    validarPercentatgePerdut();

}

function validarDiesAntelacio(){

    var dies = $("#antelacio").val();

    //Que el preu no sigui 0 ni null
    if (dies < 0 || dies == null || dies > 99){
        incorrecte("#antelacio", "#validacioAntelacio", "Els dies d'antelació definits no son valids")
    } else {
        correcte("#antelacio", "#validacioAntelacio")
        campsCorrectes++;
    }

}

function validarPercentatgePerdut(){

    var percentatge = $("#perdut").val();

    //Que el preu no sigui 0 ni null
    if (percentatge < 0 || percentatge == null || percentatge > 100){
        incorrecte("#perdut", "#validacioPerdut", "El percentatge perdut ha d'estar entre 0% i el 100%")
    } else {
        correcte("#perdut", "#validacioPerdut")
        campsCorrectes++;
    }


}

/* ---------------------CAMPS LOGIN--------------------- */


//METODE PEL RETURN DEL FORMULARI
function validacioLogin(){

    var pasaValidacio = false;

    if (campsCorrectes === 2){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormLogin(){

    campsCorrectes = 0;
    validarEmailLoggin();
    validarContrasenyaLogin();

}

function validarEmailLoggin(){

    var email=$("#correu").val();
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false){
        incorrecte("#correu", "#validacioCorreu", "No correspon a un correu electronic valid")
    }else{
        correcte("#correu", "#validacioCorreu")
        campsCorrectes++;
    }

}

function validarContrasenyaLogin(){

    var pass = $("#contrasenya").val();

    if (pass.length <= 0){
        incorrecte("#contrasenya", "#validacioPass", "Contrasenya no valida")
    }else{
        correcte("#contrasenya", "#validacioPass")
        campsCorrectes++;
    }

}


/* ---------------------CAMPS REGISTER--------------------- */

//METODE PEL RETURN DEL FORMULARI
function validacioRegister(){

    var pasaValidacio = false;

    if (campsCorrectes === 5){return true;}
    if (pasaValidacio === false){return false;}
}

function validarFormRegister(){

    campsCorrectes = 0;

    /* FALTEN AQUETS 5 METODES
    validarDniRegister();
    validarNomRegister();
    validarCognomRegister();
    validarCorreuRegister();
    validarContrasenyaRegister();
    */
}

