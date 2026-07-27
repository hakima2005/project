<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Tva extends Model {
    protected $primaryKey = 'id_tva';
    protected $fillable = ['montant_tva','pourcentage','date_debut','date_fin','description'];
}
