<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DecretTva extends Model
{
    protected $table = 'decret_tva';

    protected $fillable = [
        'date',
        'code_nat_prest',
        'taux',
    ];

    public function naturePrestation()
    {
        return $this->belongsTo(NaturePrestation::class, 'code_nat_prest', 'code_nat_prest');
    }
}
