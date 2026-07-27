<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TypeAction extends Model {
    protected $table = 'type_actions';
    protected $primaryKey = 'id_action';
    protected $fillable = ['libelle'];
}
