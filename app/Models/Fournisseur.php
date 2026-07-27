<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Fournisseur extends Model {
    protected $primaryKey = 'id_fournisseur';
    protected $fillable = ['raison_sociale','identifiant_fiscal','ICE','RC','CNSS','id_adresse','telephone','email','representation','activite_principale','id_statut'];
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function adresse() { return $this->belongsTo(Adresse::class, 'id_adresse'); }
    public function devis() { return $this->hasMany(Devis::class, 'id_fournisseur'); }
    public function bonsCommande() { return $this->belongsToMany(BonCommande::class, 'participes', 'id_fournisseur', 'reference_bc'); }
}
