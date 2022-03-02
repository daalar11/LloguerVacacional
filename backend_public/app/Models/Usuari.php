<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuari extends Model
{
    protected $table = "usuari";

    public $timestamps = false;

    protected $primaryKey ='id';

    protected $fillable = [
        'dni', 'nom', 'llinatge1', 'llinatge2', 'correu', 'contrasenya'
    ];
}
