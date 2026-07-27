<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Libelle extends Model
{
    protected $primaryKey = 'code_libelle';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'code_libelle',
        'intitule_fr',
        'intitule_ar',
        'budget_affecte',
        'budget_engage',
        'budget_consomme',
        'budget_disponible',
        'id_statut',
        'code_nat_prest',
    ];

    public function statut()
    {
        return $this->belongsTo(Statut::class, 'id_statut');
    }

    public function naturePrestation()
    {
        return $this->belongsTo(
            NaturePrestation::class,
            'code_nat_prest',
            'code_nat_prest'
        );
    }

    public function bonsCommande()
    {
        return $this->hasMany(BonCommande::class, 'code_libelle');
    }
}