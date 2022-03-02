<?php

namespace App\Http\Controllers;

use App\Models\Propietat;
use App\Models\Tarifa;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class ReservaController extends Controller
{
    /**
     * @throws \Exception
     */
    public function calcPrice($idPropietat, $d_inici, $d_fi){
        $tarifa= Tarifa::where('id_propietat',$idPropietat)->get()->toArray();
        $propietat= Propietat::find($idPropietat)->toArray();
        $preu=0;
        //print_r($d_fi)." ";

        $d_fi= new DateTime($d_fi);

        $d_inici= new DateTime($d_inici);
       // print_r($tarifa[0]['d_inici']);
        $diesTarifa=0;
        $diesReserva=0;
        for($i = $d_inici; $i <= $d_fi; $i->modify('+1 day')){
            $diesReserva++;
            for($j=0; $j<(count($tarifa));$j++){
               if($i>=new DateTime($tarifa[$j]['d_inici'])&&$i<=new DateTime($tarifa[$j]['d_fi'])){
                   $preu+=$tarifa[$j]['preu'];
                    $diesTarifa++;
               }
            }
            //print_r($i);
        }
        //print_r($diesReserva);
        if($diesReserva>$diesTarifa){
            $diesReserva=$diesReserva-$diesTarifa;
            $preu+=($diesReserva*$propietat['preu_base']);
        }
        //print_r($propietat['preu_base']);
       print_r($preu);
       //print_r($tarifa[0]['d_inici']);

           // print_r($preu);
        //print_r(count($tarifa));
        //print_r($preu);
    }
}
