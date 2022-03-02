<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuariController extends Controller
{
    //Metode llistar localitat per la seva ID que arriba per URL
    public function listUserById($idClient){

        $client = Usuari::where('id', $idClient)->first();

        return $client->toJson();

    }

    //Metode llistar localitat per la seva ID que arriba per URL
    public function listClients(){

        //Aixo es una innerjoin (joining 2 tables)
        $client = Usuari::join('client', 'usuari.id', '=', 'client.id')->get(['usuari.*', 'client.*']);

        return $client->toJson();

    }

    public function create(Request $request){

        $usuari = new Usuari();

        $dni = $request->input('dni');

        $usuari->dni = $request->input('dni');
        $usuari->nom = $request->input('nom');
        $usuari->llinatge1 = $request->input('llinatge1');
        $usuari->llinatge2 = $request->input('llinatge2');
        $usuari->contrasenya = $request->input('contrasenya');
        $usuari->correu = $request->input('correu');
        $usuari->eliminat = 0;

        $usuari -> save();

        $result = DB::table('usuari')->select('id')->where('dni', $dni)->first();

        $client = new Client();
        $client->id = $result;
        $client -> save();


    }

}
