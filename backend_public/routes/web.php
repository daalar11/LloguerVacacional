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
//AQUI ES DEFINEIXEN LES RUTES DEL LLOC WEB

/* AIXO S'ANOMENA UNA FACHADA, EN AQUEST CAS LA FACHADA "ROUTE"
I UTILITZA EL METODE GET */

/* '/' -> el mappeig de la ruta
    return view() -> Retorna una vista anomanada 'welcome' */

//Rutes Aplicació

//Route /propietats -> Llistar totes les propietats.
Route::get('/propietat',[PropietatController::class,'listAll']);

//Route /propietat/{idPropietat}/tarifes

Route::get('/', function () {
    return view('welcome');
});
