<?php

namespace App\Models;

use App\Http\Controllers\ComentariPropietatController;
use App\Http\Controllers\PropietatController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Propietat extends Model
{
    use HasFactory;

    protected $table ="propietat";

    public $timestamps = false;

    protected $primaryKey ='idpropietat';
    /**
     * @var mixed
     */

    public function habitacions(){
        return $this->hasMany(Habitacio::class,'id_propietat');
    }

    public function bloqueig(){
        return $this->hasMany(Bloqueig::class,'id_propietat');
    }

    public function localitat(){
        return $this->belongsTo(Localitat::class,'id_localitat');
    }

    public function tarifa(){
        return $this->hasMany(Tarifa::class,'id_propietat');
    }

    public function reserva(){
        return $this->hasMany(Reserva::class,'id_propietat');
    }

    public function caracteristica()
    {
        return $this->belongsToMany(Caracteristiques::class, 'caracteristiques_propietats','id_pro','id_car');
    }

    public function comentaris()
    {
        return $this->belongsToMany(Client::class, 'review_propietat','id_propietat','id_cli')
            ->withPivot("comentari")
            ->withPivot("nota_neteja")
            ->withPivot("nota_localitzacio")
            ->withPivot("nota_accesibilitat")
            ->withPivot("data_comentari");
    }

}
