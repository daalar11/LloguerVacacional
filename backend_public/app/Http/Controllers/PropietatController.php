<?php
namespace App\Http\Controllers;

use App\Models\Bloqueig;
use App\Models\Propietat;
use App\Models\Reserva;
use App\Activity;
use App\Item;

//Controlador de les propietats
class PropietatController extends Controller
{
    //Funcio que llista totes les propietats.
    public function listAll(){

        //Cream la variable propietats i utilitzam el metode all()
        $propietats= Propietat::all();

        //Retornam un parse de l'objecte propietats a JSON
        return $propietats->toJson();
    }
    public function listPropietatByPlacesAndLocalitat($idLocalitat,$places){
        $propietat = Propietat::where('id_localitat',$idLocalitat)->where("places",$places)->get()->toArray();

        return json_decode(json_encode($propietat),true);
    }
    public function listAllByPropietat()
    {
        $propietat= Propietat::with('habitacions','bloqueig','localitat','tarifa','caracteristica')->get()->toArray();

            return json_decode(json_encode($propietat),true);

    }

    public function listAllByPropietatId($idPropietat)
    {
        $propietat= Propietat::with('habitacions','bloqueig','localitat','tarifa','caracteristica', 'comentaris')->find($idPropietat)->toArray();

        return json_decode(json_encode($propietat),true);
    }

    //Funcio que llista totes les propietats d'una localitat
    public function listAllPropietatByLocalitat($idLOCALITAT){

        $propietats = Propietat::where('id_localitat', $idLOCALITAT)->get();

        //Retornam un parse de l'objecte propietats a JSON
        return $propietats->toJson();
    }

    public function diesNoDisponibles($idPropietat)
    {
        $propietat= Propietat::with('bloqueig', 'reserva')->find($idPropietat)->toArray();

        $bloqueigArray = Bloqueig::where('id_propietat',$idPropietat)->get()->toArray();
        $reservaArray = Reserva::where('id_propietat',$idPropietat)->get()->toArray();

        $diesNoDisponibles = array();

        for ($i = 0; $i<count($bloqueigArray);$i++){

            $dataEntrada = strtotime($bloqueigArray[$i]['d_inici']);
            $dataSortida = strtotime($bloqueigArray[$i]['d_fi']);

            $dataEntradaParseada = date( 'Y, m, d', $dataEntrada );
            $dataSortidaParseada = date( 'Y, m, d', $dataSortida );

            $bloqueig = array(
                "after" => \date($dataEntradaParseada),
                "before" => \date($dataSortidaParseada)
            );

            $diesNoDisponibles[] = $bloqueig;
        }

        for ($j = 0; $j<count($reservaArray);$j++){

            $dataEntrada = strtotime($reservaArray[$j]['d_arribada']);
            $dataSortida = strtotime($reservaArray[$j]['d_sortida']);

            $dataEntradaParseada = date( 'Y, m, d', $dataEntrada );
            $dataSortidaParseada = date( 'Y, m, d', $dataSortida );

            $reserva = array(
                "after" => \date($dataEntradaParseada),
                "before" => \date($dataSortidaParseada)
            );

            $diesNoDisponibles[] = $reserva;
        }

        return $diesNoDisponibles;
    }


}
