<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    /**
     * Nom de la table
     */
    protected $table = 'devis';


    /**
     * Clé primaire
     */
    protected $primaryKey = 'id_devis';


    /**
     * Champs autorisés pour mass assignment
     */
    protected $fillable = [
        'reference_devis',
        'date_devis',

        'montant_ht',
        'montant_tva',
        'montant_retenue',
        'montant_ttc',

        'piece_jointe',

        'id_statut',

        'observation',

        'reference_bc',

        'id_fournisseur',
    ];


    /**
     * Casts
     */
    protected $casts = [
        'date_devis' => 'date:Y-m-d',

        'montant_ht' => 'float',
        'montant_tva' => 'float',
        'montant_retenue' => 'float',
        'montant_ttc' => 'float',
    ];


    /**
     * =========================================================
     * STATUT
     * =========================================================
     */
    public function statut()
    {
        return $this->belongsTo(
            Statut::class,
            'id_statut',
            'id_statut'
        );
    }


    /**
     * =========================================================
     * BON DE COMMANDE
     * =========================================================
     */
    public function bonCommande()
    {
        return $this->belongsTo(
            BonCommande::class,
            'reference_bc',
            'reference_bc'
        );
    }


    /**
     * =========================================================
     * FOURNISSEUR
     * =========================================================
     */
    public function fournisseur()
    {
        return $this->belongsTo(
            Fournisseur::class,
            'id_fournisseur',
            'id_fournisseur'
        );
    }
}