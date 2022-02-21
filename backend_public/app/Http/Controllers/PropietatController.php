<?php
namespace App\Http\Controllers;
use App\Models\Habitacio;
use App\Models\Propietat;
use Illuminate\Http\Request;
use App\Activity;
use App\Item;

//Controlador de les propietats
class PropietatController extends Controller
{
    //Funcio que llista totes les propietats.
    public function listAll(Request $request){

        //Cream la variable propietats i utilitzam el metode all()
        $propietats= Propietat::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $propietats->toJson();
    }
    public function listPropietatByPlacesAndLocalitat($idLocalitat,$places){
        $propietat = Propietat::where('id_localitat',$idLocalitat)->where("places",$places)->get()->toArray();
        //return DB::select("select * from habitacions where id_propietat=".$propietat->primaryKey);
        return json_decode(json_encode($propietat),true);
    }
    public function listAllByPropietat()
    {
        $propietat= Propietat::with('habitacions','bloqueig','localitat','tarifa','caracteristica')->get()->toArray();

            return json_decode(json_encode($propietat),true);

    }

    public function listAllByPropietatId($id)
    {
        $propietat= Propietat::with('habitacions','bloqueig','localitat','tarifa','caracteristica')->find($id)->toArray();

        return json_decode(json_encode($propietat),true);
    }

    //Funcio que llista totes les propietats d'una localitat
    public function listAllPropietatByLocalitat($idLOCALITAT){

        $propietats = Propietat::where('id_localitat', $idLOCALITAT)->get();

        //Retornam un parse de l'objecte propietats a JSON
        return $propietats->toJson();
    }


}
