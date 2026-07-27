<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciceTypeMt extends Model
{
    protected $table = 'exercice_type_mts';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id_exercice',
        'id_type_mt',
        'montant',
    ];

    public function exercice()
    {
        return $this->belongsTo(Exercice::class, 'id_exercice');
    }

    public function typeMt()
    {
        return $this->belongsTo(TypeMt::class, 'id_type_mt');
    }
}