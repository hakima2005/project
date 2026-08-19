<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ExerciceController;
use App\Http\Controllers\TypeMtController;
use App\Http\Controllers\FamilleController;
use App\Http\Controllers\TypeCategorieController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\SituationBudgetaireController;
use App\Http\Controllers\NaturePrestationController;
use App\Http\Controllers\MaxNatureController;
use App\Http\Controllers\DecretRasController;
use App\Http\Controllers\DecretTvaController;
use App\Http\Controllers\BonCommandeController;
use App\Http\Controllers\DesignationController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\ProfileController;


Route::get('/', function () {
    return redirect()->route('dashboard');
});


Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index', [
            'stats' => []
        ]);
    })->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');


    /*
    |--------------------------------------------------------------------------
    | Exercices
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'exercices',
        ExerciceController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Types de montant
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'type-mts',
        TypeMtController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Familles
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'familles',
        FamilleController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Types de catégorie
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'type-categories',
        TypeCategorieController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Catégories
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/categories',
        [CategorieController::class, 'index']
    )->name('categories.index');


    /*
    |--------------------------------------------------------------------------
    | Nature de prestation
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'natures-prestation',
        NaturePrestationController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Max Nature
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/max-nature',
        [MaxNatureController::class, 'index']
    )->name('max-nature.index');

    Route::get(
        '/max-nature/create',
        [MaxNatureController::class, 'create']
    )->name('max-nature.create');

    Route::post(
        '/max-nature',
        [MaxNatureController::class, 'store']
    )->name('max-nature.store');


    /*
    |--------------------------------------------------------------------------
    | Situation budgétaire
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/situation-budgetaire',
        [SituationBudgetaireController::class, 'index']
    )->name('situation-budgetaire.index');

    Route::post(
        '/situation-budgetaire',
        [SituationBudgetaireController::class, 'store']
    )->name('situation-budgetaire.store');

    Route::put(
        '/situation-budgetaire/{situationBudgetaire}',
        [SituationBudgetaireController::class, 'update']
    )->name('situation-budgetaire.update');

    Route::delete(
        '/situation-budgetaire/{situationBudgetaire}',
        [SituationBudgetaireController::class, 'destroy']
    )->name('situation-budgetaire.destroy');


    /*
    |--------------------------------------------------------------------------
    | Décret RAS
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'decret-ras',
        DecretRasController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Décret TVA
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'decret-tva',
        DecretTvaController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Bons de commande
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'bons-commande',
        BonCommandeController::class
    );

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

    Route::post(
        '/bons-commande/{reference}/statut',
        [BonCommandeController::class, 'changerStatut']
    )->name('bons-commande.statut');


    /*
    |--------------------------------------------------------------------------
    | Désignations
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/bons-commande/{reference}/designations/create',
        [DesignationController::class, 'create']
    )->name('designations.create');

    Route::post(
        '/designations',
        [DesignationController::class, 'store']
    )->name('designations.store');

    Route::delete(
        '/designations/{id}',
        [DesignationController::class, 'destroy']
    )->name('designations.destroy');

    Route::resource(
        'designations',
        DesignationController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Fournisseurs
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'fournisseurs',
        FournisseurController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Devis
    |--------------------------------------------------------------------------
    |
    | IMPORTANT :
    | Les routes spécifiques "import" doivent être
    | placées AVANT /devis/{devi}.
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/devis/import',
        [DevisController::class, 'import']
    )->name('devis.import');

    Route::post(
        '/devis/import-document',
        [DevisController::class, 'importDocument']
    )->name('devis.import-document');

    Route::post(
        '/devis/{id}/retenir',
        [DevisController::class, 'retenir']
    )->name('devis.retenir');

    Route::resource(
        'devis',
        DevisController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Utilisateurs
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'utilisateurs',
        UtilisateurController::class
    );


    /*
    |--------------------------------------------------------------------------
    | Journal
    |--------------------------------------------------------------------------
    */

    Route::resource(
        'journals',
        JournalController::class
    );
});


require __DIR__ . '/auth.php';