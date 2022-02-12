<?php

namespace App\Http\Controllers;

use App\Models\Bloqueig;
use Illuminate\Http\Request;

class BloqueigController extends Controller
{
    //Funcio que llista totes les propietats.
    public function listAllBloqueig(Request $request){

        //Cream la variable propietats i utilitzam el metode all()
        $bloqueig = Bloqueig::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $bloqueig->toJson();
    }

}
