<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Localitat;

class LocalitatController extends Controller
{

    //Llistar totes les localitat de la bbdd
    public function listAllLocalitat(Request $request){

        $localitats = Localitat::all()->toArray();

        //$localitats = Localitat::orderBy('nomLocalitat', 'desc')->get();
        //$localitats = Localitat::latest()->get();

        return json_decode(json_encode($localitats),true);

    }

    //Metode llistar localitat per la seva ID que arriba per URL
    public function listByIdLocalitat($idLOCALITAT){

        $localitats = Localitat::where('idlocalitat', $idLOCALITAT)->get();

        return $localitats->toJson();

    }


}
