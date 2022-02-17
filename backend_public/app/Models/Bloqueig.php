<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bloqueig extends Model
{
    use HasFactory;

    protected $table ="bloqueig";
    protected $primaryKey ='idbloqueig';
    public $timestamps = false;

    public function propietat(){
        return $this->belongsTo(Propietat::class,'id_propietat');
    }
}
