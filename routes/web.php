<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExerciceController;
use App\Http\Controllers\TypeMtController;
use App\Http\Controllers\FamilleController;
use App\Http\Controllers\TypeCategorieController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\SituationBudgetaireController;
use App\Http\Controllers\NatureController;
use App\Http\Controllers\NaturePrestationController;
use App\Http\Controllers\MaxNatureController;
use App\Http\Controllers\LibelleController;
use App\Http\Controllers\DecretRasController;
use App\Http\Controllers\DecretTvaController;
use App\Http\Controllers\BonCommandeController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\JournalController;
use Inertia\Inertia;

Route::get('/', function () { return redirect()->route('dashboard'); });
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index', ['stats' => []]);
    })->name('dashboard');

    Route::get('max-nature', [MaxNatureController::class, 'index'])
    ->name('max-nature.index');

    Route::post('max-nature', [MaxNatureController::class, 'save'])
    ->name('max-nature.save');

    Route::post(
    '/bons-commande/{reference}/changer-statut',
    [BonCommandeController::class, 'changerStatut']
)->name('bons-commande.changer-statut');

    Route::get(
    '/bons-commande/{reference}/attribuer',
    [BonCommandeController::class, 'attribuer']
)->name('bons-commande.attribuer');

Route::post(
    '/bons-commande/{reference}/attribuer',
    [BonCommandeController::class, 'confirmerAttribution']
)->name('bons-commande.confirmer-attribution');

    Route::resource('exercices',     ExerciceController::class);
    Route::resource('type-mts',      TypeMtController::class);
    Route::resource('familles',      FamilleController::class);
    Route::resource('type-categories', TypeCategorieController::class);
    Route::get('/categories', [CategorieController::class, 'index'])
    ->name('categories.index');
    //Route::resource('natures',       NatureController::class);
    Route::get('/situation-budgetaire', [SituationBudgetaireController::class, 'index'])
    ->name('situation-budgetaire.index');
    Route::post('/situation-budgetaire', [SituationBudgetaireController::class, 'store'])
    ->name('situation-budgetaire.store');
    Route::resource('natures-prestation', NaturePrestationController::class);
    Route::resource('libelles',      LibelleController::class);
    Route::resource('decret-ras', DecretRasController::class);
    Route::resource('decret-tva', DecretTvaController::class);
    Route::resource('bons-commande', BonCommandeController::class);
    Route::get(
    'bons-commande/{reference}/designations/create',
    [DesignationController::class, 'create']
)->name('designations.create');

Route::post('designations', [DesignationController::class, 'store'])->name('designations.store');
Route::delete('designations/{id}', [DesignationController::class, 'destroy'])->name('designations.destroy');

   
    Route::resource('fournisseurs',  FournisseurController::class);
    Route::resource('devis',         DevisController::class);
    Route::resource('utilisateurs',  UtilisateurController::class);
    Route::resource('journals',      JournalController::class);
    Route::resource('designations', DesignationController::class);

    // Routes spéciales
    Route::post('bons-commande/{reference}/statut', [BonCommandeController::class, 'changerStatut'])->name('bons-commande.statut');
    Route::post('devis/{id}/retenir', [DevisController::class, 'retenir'])->name('devis.retenir');
});

require __DIR__.'/auth.php';
