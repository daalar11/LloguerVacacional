
var campsCorrectes = 0;

function validacioTarifa(){

    var pasaValidacio = false;

    if (campsCorrectes === 2){
        return true;
    }

    if (pasaValidacio === false){
        return false;
    }
}

function validarFormTarifa(){

    validarDataInici();
    validarDataFinal();

}

function correct(input, span){
    $(input).css("border", "2px solid green");
    $(span).css("color", "green");
    $(span).text("Bé");
}

function incorrect(input, span, missatge){
    $(input).css("border", "2px solid red");
    $(span).css("color", "red");
    $(span).text(missatge);
}

function validarDataInici(){

    var dataInici = $("#dataIni").val();
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (dataInici === "" || dataInici === null){
        incorrect("#dataIni", "#validacioDataIni", "Aquest camp es obligatori")
    } else {
        correct("#dataIni", "#validacioDataIni")
        campsCorrectes++;
    }
}

function validarDataFinal(){

    var dataFinal = $("#dataFi").val();
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (dataFinal === "" || dataFinal === null){
        incorrect("#dataFi", "#validacioDataFi", "Aquest camp es obligatori")
    } else {
        correct("#dataFi", "#validacioDataFi")
        campsCorrectes++;
    }
}