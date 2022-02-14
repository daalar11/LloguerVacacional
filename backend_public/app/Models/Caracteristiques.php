<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Caracteristiques extends Model
{
    use HasFactory;

    protected $table ="CARACTERISTIQUES";

    public $timestamps = false;

    protected $primaryKey ='id_caracteristica';
    /**
     * @var mixed
     */

    public function caracteristica()
    {
        return $this->belongsToMany(Propietat::class, 'caracteristiques_propietats','id_car','id_pro');
    }
}
