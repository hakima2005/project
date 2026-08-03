<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExerciceNatureMax extends Model
{
    protected $table = 'exercice_nature_max';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id_exercice',
        'code_nat_prest',
        'montant_max',
    ];

    public function exercice()
    {
        return $this->belongsTo(Exercice::class, 'id_exercice');
    }

    public function naturePrestation()
    {
        return $this->belongsTo(NaturePrestation::class, 'code_nat_prest', 'code_nat_prest');
    }
}