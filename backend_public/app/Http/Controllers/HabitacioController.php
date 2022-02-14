<?php

namespace App\Http\Controllers;

use App\Models\Habitacio;
use App\Models\Propietat;
use Illuminate\Http\Request;
use App\Activity;
use App\Item;
use Illuminate\Support\Facades\DB;

//Controlador de les propietats
class HabitacioController extends Controller
{
    //Funcio que llista totes les propietats.
    public function listAll(Request $request)
    {

        //Cream la variable propietats i utilitzam el metode all()
        $habitacions = Habitacio::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $habitacions->toJson();
    }
    public function listHabitacioByPropietat(Propietat $propietat)
    {
        print_r($propietat);
        $habitacions = Habitacio::where('id_propietat',$propietat->idPROPIETAT)->get();
        //return DB::select("select * from habitacions where id_propietat=".$propietat->primaryKey);
        return $habitacions->toJson();
    }
}
