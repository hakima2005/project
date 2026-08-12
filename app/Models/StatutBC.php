<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatutBC extends Model
{
    protected $table = 'statut_bc';

    protected $primaryKey = 'id_statut_bc';

    public $timestamps = false;

    protected $fillable = [
        'nom_fr',
        'nom_ar',
        'couleur',
        'ordre',
    ];
}