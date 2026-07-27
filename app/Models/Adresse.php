<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Adresse extends Model {
    protected $primaryKey = 'id_adresse';
    protected $fillable = ['rue','code_postal','ville'];
}
