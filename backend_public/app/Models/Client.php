<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table="client";

    public $timestamps = false;

    protected $primaryKey ='id';

    public function comentaris()
    {
        return $this->belongsToMany(Propietat::class, 'review_propietat','id_cli','id_propietat')
            ->withPivot("comentari")
            ->withPivot("nota_neteja")
            ->withPivot("nota_localitzacio")
            ->withPivot("nota_accesibilitat")
            ->withPivot("data_comentari");
    }

}
