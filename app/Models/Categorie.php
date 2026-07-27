<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model {
    protected $primaryKey = 'code_categorie';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['code_categorie','nom_fr','nom_ar','type_budget','montant_affecte','id_tva','id_statut','code_famille','id_exercice','id_type_categorie'];
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function naturePrestations(){ return $this->hasMany(NaturePrestation::class, 'code_categorie');}
    public function famille() { return $this->belongsTo(Famille::class, 'code_famille'); }
    public function tva() { return $this->belongsTo(Tva::class, 'id_tva'); }
    public function natures() { return $this->hasMany(Nature::class, 'code_categorie'); }
    public function exercice(){ return $this->belongsTo(Exercice::class, 'id_exercice');}
    public function typeCategorie(){return $this->belongsTo(TypeCategorie::class, 'id_type_categorie');}
}
