<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeMt extends Model
{
    protected $table = 'type_mts';

    protected $primaryKey = 'id_type_mt';

    protected $fillable = [
        'libelle',
        'actif',
    ];

    public function exercices()
    {
        return $this->hasMany(ExerciceTypeMt::class, 'id_type_mt');
    }
}