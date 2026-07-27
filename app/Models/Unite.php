<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Unite extends Model {
    protected $primaryKey = 'id_unite';
    protected $fillable = ['libelle','symbole'];
}
