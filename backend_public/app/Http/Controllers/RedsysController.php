<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use App\Http\Controllers\RedsysAPI;
use Illuminate\Support\Facades\DB;

class RedsysController extends Controller
{
    public function payReserva(Request  $request){
        $idPropietat=$request->get('idPropietat');
        $idCli=$request->get('idCli');
        $dInici=$request->get('dInici');


        $affected= DB::table('reserva')->where('id_propietat',$idPropietat)
            ->where('id_cli',$idCli)
            ->where('d_arribada',$dInici)
            ->update(array('pagada'=>1));

        return redirect("http://localhost:3000/misreservas");
    }
    public function reservar(Request $request){
        $miObj = new RedsysAPI;
        $idPropietat = $request->get('idPropietat');
        $idClient=$request->get('idClient');
        $today=$request->get('today');
        $dinici=$request->get('dinici');
        $dfi=$request->get('dfi');
        $normes=$request->get('normes');
        $preu=$request->get('preu');

        $reserva = new Reserva();

        $reserva->id_propietat=$idPropietat;
        $reserva->id_cli=$idClient;
        $reserva->data_reserva=$today;
        $reserva->d_arribada=$dinici;
        $reserva->d_sortida=$dfi;
        $reserva->copia_normes=$normes;
        $reserva->preu_final=$preu;

        $reserva->save();
        $fuc="999008881";
        $terminal="1";
        $moneda="978";
        $trans="0";
        $url="https://sis-t.redsys.es:25443/sis/realizarPago";
        $urlOK="http://localhost:8000/confirmarReserva?idPropietat=".$idPropietat."&idCli=".$idClient."&dInici=".$dinici;
        $urlKO="http://localhost:8000/cancelarReserva?idPropietat=".$idPropietat."&idCli=".$idClient."&dInici=".$dinici;
        $id=date('ymdHis');
        $amount=$preu*100;


        // Se Rellenan los campos
        $miObj->setParameter("DS_MERCHANT_AMOUNT",$amount);
        $miObj->setParameter("DS_MERCHANT_ORDER",$id);
        $miObj->setParameter("DS_MERCHANT_MERCHANTCODE",$fuc);
        $miObj->setParameter("DS_MERCHANT_CURRENCY",$moneda);
        $miObj->setParameter("DS_MERCHANT_TRANSACTIONTYPE",$trans);
        $miObj->setParameter("DS_MERCHANT_TERMINAL",$terminal);
        $miObj->setParameter("DS_MERCHANT_MERCHANTURL",$url);
        $miObj->setParameter("DS_MERCHANT_URLOK",$urlOK);
        $miObj->setParameter("DS_MERCHANT_URLKO",$urlKO);

        //Datos de configuración
        $version="HMAC_SHA256_V1";
        $kc = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';//Clave recuperada de CANALES
        // Se generan los parámetros de la petición
        $request = "";
        $params = $miObj->createMerchantParameters();
        $signature = $miObj->createMerchantSignature($kc);


        echo phpversion();

        ?>



<html lang="es">
<head>
</head>
<body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<form id="realizarPago" name="frm" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST" target="_blank">
    Ds_Merchant_SignatureVersion <input type="text" name="Ds_SignatureVersion" value="<?php echo $version; ?>"/></br>
    Ds_Merchant_MerchantParameters <input type="text" name="Ds_MerchantParameters" value="<?php echo $params; ?>"/></br>
    Ds_Merchant_Signature <input type="text" name="Ds_Signature" value="<?php echo $signature; ?>"/></br>
    <input type="submit" value="Enviar" >
</form>
<script>
    $(document).ready(function (){
        $("#realizarPago").submit();
    })
</script>

</body>
</html>
<?php
    }
}
?>
