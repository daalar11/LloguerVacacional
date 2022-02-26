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
                return response()->json(['message' => 'Image not found.' . $path], 404);
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

}
/* $fileNames = array();
        if(is_dir($absolute_path)){
            $handle = opendir($absolute_path);
            while(false !== ($file = readdir($handle))){
                if(is_file($absolute_path.'/'.$file) && is_readable($absolute_path.'/'.$file)){
                    $fileNames[] = $file;
                    $fileNames = array_reverse($fileNames);

                }
            }
            closedir($handle);
        }else {
            echo "<p>There is an directory read issue</p>";
        }*/
