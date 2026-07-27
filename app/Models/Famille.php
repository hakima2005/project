<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Famille extends Model {
    protected $primaryKey = 'code_famille';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['code_famille','nom_fr','nom_ar','description','id_statut','id_exercice'];
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function exercice() { return $this->belongsTo(Exercice::class, 'id_exercice'); }
    public function categories() { return $this->hasMany(Categorie::class, 'code_famille'); }
}
