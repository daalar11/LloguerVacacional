<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{

    use HasFactory;

    protected $table ="reserva";
    protected $primaryKey ='idreserva';
    public $timestamps = true;

    public function propietat(){
        return $this->belongsTo(Propietat::class,'id_propietat');
    }
}
