<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeCategorie extends Model
{
    protected $primaryKey = 'id_type_categorie';

    protected $fillable = [
        'libelle',
        'id_statut',
    ];

    public function statut()
    {
        return $this->belongsTo(Statut::class, 'id_statut');
    }

    public function categories()
    {
        return $this->hasMany(Categorie::class, 'id_type_categorie');
    }
    public function naturePrestations()
    {
        return $this->hasMany(
            NaturePrestation::class,
            'id_type_categorie'
     );
    }
}