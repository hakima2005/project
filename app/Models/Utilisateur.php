<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model {
    protected $primaryKey = 'id_utilisateur';
    protected $fillable = ['nom','prenom','login','mot_de_passe','id_profil','id_statut'];
    protected $hidden = ['mot_de_passe'];
    public function profil() { return $this->belongsTo(Profil::class, 'id_profil'); }
    public function statut() { return $this->belongsTo(Statut::class, 'id_statut'); }
    public function journals() { return $this->hasMany(Journal::class, 'id_utilisateur'); }
}
