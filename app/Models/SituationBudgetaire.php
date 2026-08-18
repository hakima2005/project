<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SituationBudgetaire extends Model
{
    protected $table = 'situations_budgetaires';

    protected $fillable = [
        'id_exercice',
        'n_compte',
        'id_type_categorie',
        'montant',
        'reste_a_payer',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'reste_a_payer' => 'decimal:2',
    ];

    public function exercice()
    {
        return $this->belongsTo(
            Exercice::class,
            'id_exercice',
            'id_exercice'
        );
    }

    public function typeCategorie()
    {
        return $this->belongsTo(
            TypeCategorie::class,
            'id_type_categorie',
            'id_type_categorie'
        );
    }
}