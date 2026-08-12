<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BonCommande extends Model {
    protected $table = 'bons_commande';
    protected $primaryKey = 'reference_bc';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'reference_bc', 'objet', 'date_creation', 'date_mise_en_ligne',
        'date_limite_devis', 'id_statut_bc', 'observations',
        'id_exercice', 'code_libelle', 'code_nat_prest',
        'montant_estimatif', 'tva_applicable', 'retenue_applicable', 'montant_ttc',
        'garanti', 'motif_annulation', 'caution_restituee', 'date_annulation',
    ];

    protected $casts = [
        'garanti'           => 'boolean',
        'caution_restituee' => 'boolean',
    ];

    public function statutBC()
{
    return $this->belongsTo(
        StatutBC::class,
        'id_statut_bc',
        'id_statut_bc'
    );
}
    public function exercice() { return $this->belongsTo(Exercice::class, 'id_exercice'); }
    public function libelle() { return $this->belongsTo(Libelle::class, 'code_libelle'); }
    public function naturePrestation() { return $this->belongsTo(NaturePrestation::class, 'code_nat_prest'); }
    public function designations() { return $this->hasMany(Designation::class, 'reference_bc'); }
    public function devis() { return $this->hasMany(Devis::class, 'reference_bc'); }
    public function fournisseurs() { return $this->belongsToMany(Fournisseur::class, 'participes', 'reference_bc', 'id_fournisseur'); }
    public function fournisseurAttribue()
{
    return $this->belongsTo(
        Fournisseur::class,
        'id_fournisseur_attribue',
        'id_fournisseur'
    );
}

}
