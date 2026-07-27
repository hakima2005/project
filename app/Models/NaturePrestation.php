<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NaturePrestation extends Model
{
    protected $table = 'nature_prestations';

    protected $primaryKey = 'code_nat_prest';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'code_nat_prest',
        'intitule_fr',
        'intitule_ar',
        'description',
        'id_statut',
        'id_type_categorie',
    ];

    public function statut()
    {
        return $this->belongsTo(Statut::class, 'id_statut');
    }

    public function bonsCommande()
    {
        return $this->hasMany(BonCommande::class, 'code_nat_prest');
    }
    public function typeCategorie()
    {
        return $this->belongsTo(
            TypeCategorie::class,
            'id_type_categorie'
     );
    }
    public function libelles()
{
    return $this->hasMany(
        Libelle::class,
        'code_nat_prest',
        'code_nat_prest'
    );
}
}