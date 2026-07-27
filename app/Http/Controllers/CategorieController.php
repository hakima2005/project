<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Famille;
use App\Models\TypeCategorie;
use App\Models\Tva;
use App\Models\Exercice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NaturePrestation;

class CategorieController extends Controller
{
    public function index()
{
    $natures = NaturePrestation::with([
        'typeCategorie',
        'libelles'
    ])->get();

    return Inertia::render('Categorie/Index', [
        'natures' => $natures,
    ]);
}

}