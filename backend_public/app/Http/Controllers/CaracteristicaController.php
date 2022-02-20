<?php

namespace App\Http\Controllers;

use App\Models\Caracteristiques;
use App\Models\Habitacio;
use App\Models\Propietat;
use Illuminate\Http\Request;
use App\Activity;
use App\Item;
use Illuminate\Support\Facades\DB;

//Controlador de les propietats
class CaracteristicaController extends Controller
{
    //Funcio que llista totes les propietats.
    public function listAll(Request $request)
    {

        //Cream la variable propietats i utilitzam el metode all()
        $caracteristica = Caracteristiques::all()->toArray();

        //Retornam un parse de l'objecte propietats a JSON
        return json_decode(json_encode($caracteristica),true);
    }


}
