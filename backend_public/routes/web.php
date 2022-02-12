<?php

use App\Http\Controllers\PropietatController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// ********** Rutes Aplicació (END POINTS) *************************

//Ruta testeo
Route::get('/', function () {
    return 'Aixo es la part de Laravel (Api)';
});

// -------------- Rutes Propietat --------------------

//Route /propietats -> Llistar totes les propietats.
Route::get('/propietat',[PropietatController::class,'listAll']);

//Ruta que llista totes les propietats d'una localitat
Route::get('/propietats/localitat/{idLOCALITAT}',[PropietatController::class,'listAllPropietatByLocalitat']);

// -------------- Rutes Localitat --------------------

//Ruta llistar totes les localitats existents
Route::get('/localitats', [\App\Http\Controllers\LocalitatController::class, 'listAllLocalitat']);

//Ruta llistar una localitat en concret mitjançant la seva id
Route::get('/localitats/{idLOCALITAT}', [\App\Http\Controllers\LocalitatController::class, 'listByIdLocalitat']);

// -------------- Rutes Bloqueig --------------------

//Ruta de llistar tots els bloqueig existents
Route::get('/bloqueig', [\App\Http\Controllers\BloqueigController::class, 'listAllBloqueig']);

//Ruta de llistar tots els bloqueigs d'una propietat.
Route::get('/propietat/{idPROPIETAT}/bloqueig', [\App\Http\Controllers\BloqueigController::class, 'listBloqueigsByPropietat']);

//Ruta de llistar un bloqueig en particular de una propietat
Route::get('/propietat/{idPROPIETAT}/bloqueig/{idBLOQUEIG}', [\App\Http\Controllers\BloqueigController::class, 'listBloqueigByPropietat']);

// -------------- Rutes Tarifa --------------------

//Ruta de llistar tots els bloqueig existents
Route::get('/tarifes', [\App\Http\Controllers\TarifaController::class, 'listAllTarifes']);

//Ruta de llistar tots els bloqueigs d'una propietat.
Route::get('/propietat/{idPROPIETAT}/tarifes', [\App\Http\Controllers\TarifaController::class, 'listTarifesByPropietat']);

//Ruta de llistar un bloqueig en particular de una propietat
Route::get('/propietat/{idPROPIETAT}/tarifes/{idTARIFA}', [\App\Http\Controllers\TarifaController::class, 'listTarifaByPropietat']);
