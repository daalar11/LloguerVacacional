<?php
namespace App\Http\Controllers;
use App\Models\Propietat;
use Illuminate\Http\Request;
use App\Activity;
use App\Item;

class PropietatController extends Controller
{
    public function listAll(Request $request){
        $propietats= Propietat::all();
        return $propietats->toJson();
    }
}
