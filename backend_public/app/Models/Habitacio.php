<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Habitacio extends Model
{
    protected $table = "habitacions";

    public $timestamps = false;

    protected $primaryKey = 'idhabitacions';

    public function  propietat(){
        return $this->belongsTo(Propietat::class,'id_propietat');
    }
}
