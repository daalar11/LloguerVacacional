<?php

namespace App\Http\Controllers;

use FilesystemIterator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class FotosController extends Controller
{

    //AQUEST METODE PENJA LES FOTOS I ELS ESTABLEIX UNA RUTA PER TAL DE QUE REACT PUGUI ACCEDIR A ELLES
    public function listFotoByNumber($idPropietat, $filename)
    {
            $absolute_path = realpath("/Media/" . $idPropietat . "-media/img/");

            $path = $absolute_path . '\\' . $filename;

            //Si la foto que cerca no exiteix
            if(!File::exists($path)) {
                return response()->json(['message' => "Image not'.$path.' found $path"], 404);
            }

            $file = File::get($path);
            $type = File::mimeType($path);

            $response = Response::make($file, 200);
            $response->header("Content-Type", $type);

            return $response;

    }

    //AQUEST METODE RETORNA UN ARRAY MULTIDIMENSIONAL AMB LESTRUCTURA DE UN ITEM DEL CARROUSEL
    //RETORNA UN ITEM PER CADA FOTO QUE TROBI DINS LA CARPETA img
    public function infoFotos($idPropietat)
    {
        $absolute_path = realpath("/Media/" . $idPropietat ."-media/img/");

        $fi = new FilesystemIterator($absolute_path, FilesystemIterator::SKIP_DOTS);
        $numeroFotosSecundaries = iterator_count($fi);

        $info = array();

        for ($i = 1; $i<$numeroFotosSecundaries+1;$i++){

            $path = 'http://localhost:8000/propietat/' . $idPropietat . '/fotos/secundaries/' . $idPropietat . '-' . $i . '.jpg';

            $foto = array(
                "src" => $path,
                "altText" => 'Foto ' . $i
            );

            $info[] = $foto;
        }
        return $info;
    }

    public function listPortadesByIdPropietat($idPropietat)
    {
        $path = realpath("/Media/" . $idPropietat . "-media/" . $idPropietat . "-portada.jpg");
        print_r($path);

        //Si la foto que cerca no exiteix
        if(!File::exists($path)) {
            return response()->json(['message' => "Image not found.' . $path"], 404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);
        print_r($path);
        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        ob_end_clean();
        return $response;

    }

    public function infoPortades()
    {
        $absolute_path = realpath("/Media/");

        $fi = new FilesystemIterator($absolute_path, FilesystemIterator::SKIP_DOTS);
        $numeroCases = iterator_count($fi);

        $info = array();

        for ($i = 1; $i<$numeroCases+1;$i++){

            $path = 'https://api.lloguerdavid.me/propietat/' . $i . '/fotos/portada';

            $foto = array(
                "src" => $path,
                "altText" => 'Foto ' . $i
            );

            $info[] = $foto;
        }
        return $info;
    }

}
