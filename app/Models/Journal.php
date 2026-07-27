<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model {
    protected $primaryKey = 'id_journal';
    protected $fillable = ['date_heure','id_action','ancienne_valeur','nouvelle_valeur','adresse_ip','id_utilisateur'];
    public function utilisateur() { return $this->belongsTo(Utilisateur::class, 'id_utilisateur'); }
    public function typeAction() { return $this->belongsTo(TypeAction::class, 'id_action'); }
}
