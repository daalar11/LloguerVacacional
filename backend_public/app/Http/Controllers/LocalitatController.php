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

        //Condicio                 where('columna', 'valor')->get()
        //$localitats = Localitat::where('nomLocalitat', 'Artà')->get();

        //Condicio (ULTIM RECORD)  latest()->get();
        //$localitats = Localitat::latest()->get();


        return $localitats->toJson();

    }


}
