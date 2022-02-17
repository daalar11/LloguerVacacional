<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
    use HasFactory;

    protected $table ="tarifa";
    protected $primaryKey ='idtarifa';
    public $timestamps = false;

    public function propietat(){
        return $this->belongsTo(Propietat::class,'id_propietat');
    }
}
