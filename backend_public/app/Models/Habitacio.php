<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitacio extends Model
{
    protected $table = "HABITACIONS";

    public $timestamps = false;

    protected $primaryKey = 'idHABITACIONS';

    public function  propietat(){
        return $this->belongsTo(Propietat::class,'id_propietat');
    }
}
