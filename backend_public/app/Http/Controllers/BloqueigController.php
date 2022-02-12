<?php

namespace App\Http\Controllers;

use App\Models\Bloqueig;
use Illuminate\Http\Request;

class BloqueigController extends Controller
{
    //Funcio que llista tots els bloqueig existens de totes les propietats.
    public function listAllBloqueig(){

        //Cream la variable propietats i utilitzam el metode all()
        $bloqueig = Bloqueig::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $bloqueig->toJson();
    }

    //Llista tots els bloquejos en funcio d'una propietat (mitjançant lid a Lurl)
    public function listBloqueigsByPropietat($idPROPIETAT){

        $bloqueig = Bloqueig::where('id_propietat', $idPROPIETAT)
            ->orderBy('idBLOQUEIG', 'desc')
            ->take(10)
            ->get();

        return $bloqueig->toJson();
    }

    //Llista tots els bloquejos en funcio d'una propietat (mitjançant lid a Lurl)
    public function listBloqueigByPropietat($idPROPIETAT, $idBLOQUEIG){

        $bloqueig = Bloqueig::where('id_propietat', $idPROPIETAT)
            ->where('idBLOQUEIG', $idBLOQUEIG)
            ->orderBy('idBLOQUEIG', 'desc')
            ->take(10)
            ->get();

        return $bloqueig->toJson();
    }

    //Metode que no sutilitza
    public function guardar(Request $request){

        Bloqueig::create([
            'd_inici' => $request->d_inici,
            'd_fi' => $request->d_fi,
            'id_propietat' => $request->id_propietat,
        ]);

        return redirect()->intended('/bloqueig/create');
    }

}
