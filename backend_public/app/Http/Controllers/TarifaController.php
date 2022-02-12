<?php

namespace App\Http\Controllers;

use App\Models\Tarifa;
use Illuminate\Http\Request;

class TarifaController extends Controller
{
    //Funcio que llista tots els bloqueig existens de totes les propietats.
    public function listAllTarifes(){

        //Cream la variable propietats i utilitzam el metode all()
        $tarifes = Tarifa::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $tarifes->toJson();
    }

    //Llista tots els bloquejos en funcio d'una propietat (mitjançant lid a Lurl)
    public function listTarifesByPropietat($idPROPIETAT){

        $tarifes = Tarifa::where('id_propietat', $idPROPIETAT)
            ->orderBy('idTARIFA', 'desc')
            ->take(10)
            ->get();

        return $tarifes->toJson();
    }

    //Llista tots els bloquejos en funcio d'una propietat (mitjançant lid a Lurl)
    public function listTarifaByPropietat($idPROPIETAT, $idTARIFA){

        $tarifa = Tarifa::where('id_propietat', $idPROPIETAT)
            ->where('idTARIFA', $idTARIFA)
            ->orderBy('idTARIFA', 'desc')
            ->take(10)
            ->get();

        return $tarifa->toJson();
    }

}
