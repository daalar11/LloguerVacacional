<?php

use App\Http\Controllers\HabitacioController;
use App\Http\Controllers\PropietatController;
use Illuminate\Support\Facades\Route;

//Linies necessaries per evitar l'error de CORS (permissos) respecte quan demanin serveis d'aquesta API
//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
//header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//header("Allow: GET, POST, OPTIONS, PUT, DELETE");
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
//Route::get('/propietat',[PropietatController::class,'listAll']);
//Route::get('/habitacio',[HabitacioController::class,'listAll']);
//Rutes principals
Route::get('/all',[PropietatController::class,'listAllByPropietat']);
Route::get('/all/{Id}',[PropietatController::class,'listAllByPropietatId']);
Route::get('/propietat/{idLocalitat}/{places}',[PropietatController::class,'listPropietatByPlacesAndLocalitat']);

Route::get('/{idPropietat}/habitacio',[HabitacioController::class,'listHabitacioByPropietat']);

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
