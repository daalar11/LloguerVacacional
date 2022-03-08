<?php

namespace App\Http\Controllers;

use App\Models\Propietat;
use App\Models\Reserva;
use App\Models\Tarifa;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservaController extends Controller
{
    /**
     * @throws \Exception
     */
    public function calcPrice($idPropietat, $d_inici, $d_fi){
        $tarifa= Tarifa::where('id_propietat',$idPropietat)->where('activa',1)->get()->toArray();
        $propietat= Propietat::find($idPropietat)->toArray();
        $preu=0;

        $d_fi= new DateTime($d_fi);
        $d_inici= new DateTime($d_inici);

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
        }

        if($diesReserva>$diesTarifa){
            $diesReserva=$diesReserva-$diesTarifa;
            $preu+=($diesReserva*$propietat['preu_base']);
        }
        if($diesReserva>=30&&$propietat['descompte_mes']>0){
            $preu=$preu*(1-($propietat['descompte_mes']/100));
        }else if($diesReserva>=7&&$propietat['descompte_setmana']>0){
            $preu=$preu*(1-($propietat['descompte_setmana']/100));
        }
       $preuFinal['valor']=$preu;

       return  json_decode(json_encode($preuFinal),true);
    }

    public function listReservaByIdClient($idClient){
        $reserva=Reserva::where('id_cli',$idClient)->get()->toArray();
        return json_decode(json_encode($reserva),true);
    }
    public function cancelarReservaNoPagada(Request $request){
        $idPropietat=$request->get('idPropietat');
        $idCli=$request->get('idCli');
        $dInici=$request->get('dInici');
        $affected= DB::table('reserva')->where('id_propietat',$idPropietat)
            ->where('id_cli',$idCli)
            ->where('d_arribada',$dInici)
            ->where('pagada',0)
            ->delete();
        return redirect("https://www.lloguerdavid.me/misreservas");
    }

}
