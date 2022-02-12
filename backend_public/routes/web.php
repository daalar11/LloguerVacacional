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
//Rutes Aplicació

//Ruta testeo
Route::get('/', function () {
    return 'Aixo es la part de Laravel (Api)';
});


//Rutes Propietat

//Route /propietats -> Llistar totes les propietats.
Route::get('/propietat',[PropietatController::class,'listAll']);

//Route /propietat/{idPropietat}/tarifes

//Rutes Localitat
Route::get('/localitats', [\App\Http\Controllers\LocalitatController::class, 'listAllLocalitat']);

//Rutes Bloqueig
Route::get('/bloqueig', [\App\Http\Controllers\BloqueigController::class, 'listAllBloqueig']);
