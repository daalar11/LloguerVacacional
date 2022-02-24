<?php

namespace App\Http\Controllers;

use App\Models\ComentariPropietat;
use Illuminate\Http\Request;

class ComentariPropietatController extends Controller
{
    //Metode llistar localitat per la seva ID que arriba per URL
    public function listComentsByIdLocalitat($idPropietat){

        $comentaris = ComentariPropietat::where('idPropietat', $idPropietat)->get();

        return $comentaris->toJson();

    }
}
