<?php

use App\Http\Controllers\HabitacioController;
use App\Http\Controllers\PropietatController;
use App\Http\Controllers\FotosController;
use App\Http\Controllers\ReservaController;
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
Route::get('/all2/{idPropietat}/{d_inici}/{d_fi}',[ReservaController::class,'calcPrice']);
Route::get('/all',[PropietatController::class,'listAllByPropietat']);
Route::get('/all/{idPropietat}',[PropietatController::class,'listAllByPropietatId']);
Route::get('/propietat/{idLocalitat}/{places}',[PropietatController::class,'listPropietatByPlacesAndLocalitat']);

// ------------- Rutes Habitacions -------------------
Route::get('/{idPropietat}/habitacions',[HabitacioController::class,'listHabitacioByPropietat']);

Route::get('/{idPropietat}/habitacio',[HabitacioController::class,'listHabitacioByIdPropietat']);


Route::get('/caracteristica',[\App\Http\Controllers\CaracteristicaController::class,'listAll']);

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

// -------------- Rutes Comentari Propietat --------------------

Route::get('/propietat/{idPROPIETAT}/comentaris', [PropietatController::class, 'listComentsByIdLocalitat']);

Route::post('/propietat/comentar', [\App\Http\Controllers\ComentariPropietatController::class, 'insertComentari']);

// -------------- Rutes Client Propietat --------------------
Route::get('/client/{idUsuari}', [\App\Http\Controllers\UsuariController::class, 'listUserById']);

Route::get('/client', [\App\Http\Controllers\UsuariController::class, 'listClients']);

// -------------- Rutes Fotos d'una Propietat--------------------

// Ruta que retorna una foto secundaria en funcio de l'id de la propietat i el nom de la foto
Route::get('/propietat/{idPropietat}/fotos/secundaries/{filename}', [FotosController::class, 'listFotoByNumber']);

// Ruta que conte el json amb l'estructura que espera el carrousel de la vista de cada propietat
Route::get('/propietat/{idPropietat}/fotos/info', [FotosController::class, 'infoFotos']);

// Ruta que retorna una foto secundaria en funcio de l'id de la propietat i el nom de la foto
Route::get('/propietat/{idPropietat}/fotos/portada', [FotosController::class, 'listPortadesByIdPropietat']);

// Ruta que conte el json amb totes les fotos de portada de les propietats existents pel carrousel de la pantalla hoem
Route::get('/propietat/fotos/info/portades', [FotosController::class, 'infoPortades']);

// -------------- Rutes dies no Disponible pel dayPicker --------------------

Route::get('/propietat/{idPropietat}/nodisponible/info', [PropietatController::class, 'diesNoDisponibles']);

// -------------- Rutes crear usuari --------------------
Route::post('/register', [\App\Http\Controllers\UsuariController::class, 'create']);
Route::get('/misReservas/{idClient}',[ReservaController::class,'listReservaByIdClient']);
Route::post('/login', [\App\Http\Controllers\UsuariController::class, 'login']);
Route::post('/reserva', [\App\Http\Controllers\RedsysController::class, 'reservar']);
Route::get('/confirmarReserva',[\App\Http\Controllers\RedsysController::class,'payReserva']);
