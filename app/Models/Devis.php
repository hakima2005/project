<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Devis extends Model {
    protected $primaryKey = 'id_devis';
    protected $fillable = ['reference_devis','date_devis','montant_ht','montant_tva','montant_ttc','montant_retenue','piece_jointe','id_statut','observation','reference_bc','id_fournisseur'];
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function bonCommande() { return $this->belongsTo(BonCommande::class, 'reference_bc'); }
    public function fournisseur() { return $this->belongsTo(Fournisseur::class, 'id_fournisseur'); }
}
