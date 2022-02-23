<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class UsuariController extends Controller
{
    //Metode llistar localitat per la seva ID que arriba per URL
    public function listUserById($idClient){

        $client = Usuari::where('id', $idClient)->get();

        return $client->toJson();

    }
}
