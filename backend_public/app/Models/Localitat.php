<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localitat extends Model
{
    //use HasFactory;

    //Especificam el nom de la taula
    protected $table = 'localitat';

    //Clau primaria de la taula localitat
    protected $primaryKey ='idLOCALITAT';

    public $timestamps = false;
}
