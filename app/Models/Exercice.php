<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercice extends Model
{
    protected $primaryKey = 'id_exercice';

    protected $fillable = [
        'annee',
        'date_debut',
        'date_fin',
        'date_visee',
        'id_statut',
        'observations',
    ];

    public function statut()
    {
        return $this->belongsTo(Statut::class, 'id_statut');
    }

    public function familles()
    {
        return $this->hasMany(Famille::class, 'id_exercice');
    }

    public function bonsCommande()
    {
        return $this->hasMany(BonCommande::class, 'id_exercice');
    }

    public function typesMontant()
    {  
        return $this->hasMany(ExerciceTypeMt::class, 'id_exercice');
    }
    public function categories()
    {
    return $this->hasMany(Categorie::class, 'id_exercice');
    }
}