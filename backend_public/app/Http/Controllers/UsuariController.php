<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

        //Insert d'un nou client a la taula usuaris
        $usuari = new Usuari();

        $dni = $request->input('dni');

        $usuari->dni = $request->input('dni');
        $usuari->nom = $request->input('nom');
        $usuari->llinatge1 = $request->input('llinatge1');
        $usuari->llinatge2 = $request->input('llinatge2');
        $usuari->contrasenya = bcrypt($request->input('contrasenya'));
        $usuari->correu = $request->input('correu');
        $usuari->eliminat = 0;

        $usuari -> save();

        //Un cop hem inserit el nou usuari l'inserim a la taula client
        $result = Usuari::select('usuari.id')->where('usuari.dni', '=',  $dni)->first();
        $client = new Client();
        $client->id = $result->id;
        $client -> save();


    }

    public function login(Request $request){

        $correu = $request->input('correu');
        $contrasenya = $request->input('contrasenya');

        //Un cop hem inserit el nou usuari l'inserim a la taula client
        $result = Usuari::select('*')->where('usuari.correu', '=',  $correu)->first();

        $resposta = array();

        //Si entra a s'if vol dir que el correu correspon a un usuari existent
        if ($result != null){

            $passHasheada = $result->contrasenya;
            
            if (Hash::check($contrasenya, $passHasheada)) {

                array_push($resposta, 0, "Contrassenya incorrecte", $result);

            } else {

                //Si entra a l'else vol dir que la contrassenya no correspon
                array_push($resposta, 2, "Contrassenya incorrecte");

            }

        } else {

            array_push($resposta, 1, "L'usuari no existeix");

        }

        return $resposta;

    }


}
