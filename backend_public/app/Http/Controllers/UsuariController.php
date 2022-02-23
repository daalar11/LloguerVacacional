<?php

namespace App\Http\Controllers;

use App\Models\Usuari;
use Illuminate\Http\Request;

class UsuariController extends Controller
{
    //Metode llistar localitat per la seva ID que arriba per URL
    public function listUserById($idClient){

        $client = Usuari::where('id', $idClient)->first();

        return $client->toJson();

    }
}
