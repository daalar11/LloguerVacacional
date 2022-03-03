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

    public function insertComentari(Request $request){

        $resposta = array();

        //Insert d'un nou client a la taula usuaris
        $comentari = new ComentariPropietat();

        $comentari->id_propietat = $request->input('idPropietat');
        $comentari->id_cli = $request->input('idClient');
        $comentari->comentari = $request->input('comentari');
        $comentari->data_comentari = date('Y-m-d');
        $comentari->nota_localitzacio = $request->input('notaUbicacio');
        $comentari->nota_neteja = $request->input('notaNeteja');
        $comentari->nota_accesibilitat = $request->input('notaEstada');

        if($comentari -> save()) {

            array_push($resposta, 0, "Comentari guardat amb exit");

        } else {
            array_push($resposta, 1, "Insert del comentari no fet");
        }

        return $resposta;

    }
}
