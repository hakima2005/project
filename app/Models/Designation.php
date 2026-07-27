<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Designation extends Model {
    protected $primaryKey = 'id_designation';
    protected $fillable = ['num_ordre','designation','id_unite','quantite','prix_unitaire_ht','montant_ht','tva','montant_ttc','observation','reference_bc'];
    public function unite() { return $this->belongsTo(Unite::class, 'id_unite'); }
    public function bonCommande() { return $this->belongsTo(BonCommande::class, 'reference_bc'); }
}
