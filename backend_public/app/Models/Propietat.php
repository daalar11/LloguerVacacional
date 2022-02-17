<?php

namespace App\Models;

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

    public function caracteristica()
    {
        return $this->belongsToMany(Caracteristiques::class, 'caracteristiques_propietats','id_pro','id_car');
    }

}
