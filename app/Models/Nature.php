<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Nature extends Model {
    protected $primaryKey = 'code_nature';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['code_nature','nom_fr','nom_ar','description','id_statut','code_categorie'];
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function categorie() { return $this->belongsTo(Categorie::class, 'code_categorie'); }
    public function libelles() { return $this->hasMany(Libelle::class, 'code_nature'); }
}
