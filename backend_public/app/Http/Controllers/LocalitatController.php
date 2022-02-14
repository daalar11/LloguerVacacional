<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Localitat;

class LocalitatController extends Controller
{

    //Llistar totes les localitat de la bbdd
    public function listAllLocalitat(Request $request){

        $localitats = Localitat::all();

        //$localitats = Localitat::orderBy('nomLocalitat', 'desc')->get();
        //$localitats = Localitat::latest()->get();

        return $localitats->toJson();

    }

    //Metode llistar localitat per la seva ID que arriba per URL
    public function listByIdLocalitat($idLOCALITAT){

        $localitats = Localitat::where('idLOCALITAT', $idLOCALITAT)->get();

        return $localitats->toJson();

    }


}
