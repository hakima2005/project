<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\TypeMt;
use App\Models\ExerciceTypeMt;
use App\Models\Statut;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciceController extends Controller
{
    public function index()
    {
        $exercices = Exercice::with('statut')->get();

        return Inertia::render('Exercice/Index', [
            'exercices' => $exercices,
        ]);
    }

    public function create()
{
    $typesMt = TypeMt::where('actif', true)->get();

    return Inertia::render('Exercice/Create', [
        'typesMt' => $typesMt,
    ]);
}

public function store(Request $request)
{
    $request->validate([
        'annee' => 'required|integer|unique:exercices,annee',
        'date_visee' => 'nullable|date',
        'observations' => 'nullable|string',
        'montants' => 'required|array',
    ]);

    $statut = Statut::where('nom_fr', 'Créé')->firstOrFail();

    $exercice = Exercice::create([
        'annee' => $request->annee,
        'date_visee' => $request->date_visee,
        'observations' => $request->observations,
        'id_statut' => $statut->id_statut,
    ]);

    foreach ($request->montants as $idTypeMt => $montant) {

        if ($montant === '' || $montant === null) {
            continue;
        }

        ExerciceTypeMt::create([
            'id_exercice' => $exercice->id_exercice,
            'id_type_mt' => $idTypeMt,
            'montant' => $montant,
        ]);
    }

    return redirect()
        ->route('exercices.index')
        ->with('success', 'Exercice créé avec succès.');
}

    public function show($id)
    {
        $exercice = Exercice::with([
            'statut',
            'typesMontant.typeMt',
            ])->findOrFail($id);
            return Inertia::render('Exercice/Show', [
                'exercice' => $exercice,
                ]);
    
    }
public function edit($id)
{
    $exercice = Exercice::findOrFail($id);

    $typesMt = TypeMt::where('actif', true)->get();

    $montants = ExerciceTypeMt::where('id_exercice', $id)->get();

    return Inertia::render('Exercice/Edit', [
        'exercice' => $exercice,
        'typesMt' => $typesMt,
        'montants' => $montants,
    ]);
}
public function update(Request $request, $id)
{
    $request->validate([
        'annee' => 'required|integer|min:2000|max:2100',
        'date_visee' => 'nullable|date',
        'observations' => 'nullable|string',
        'typesMontant' => 'array',
        'typesMontant.*.id_type_mt' => 'required|exists:type_mts,id_type_mt',
        'typesMontant.*.montant' => 'required|numeric|min:0',
    ]);

    $exercice = Exercice::findOrFail($id);
    
    // Mettre à jour les champs de l'exercice
    $exercice->update([
        'annee' => $request->annee,
        'date_visee' => $request->date_visee,
        'observations' => $request->observations,
    ]);

    // Mettre à jour les types de montant
    foreach ($request->typesMontant as $typeMontant) {
        ExerciceTypeMt::updateOrCreate(
            [
                'id_exercice' => $exercice->id_exercice,
                'id_type_mt' => $typeMontant['id_type_mt'],
            ],
            [
                'montant' => $typeMontant['montant'],
            ]
        );
    }

    return redirect()->route('exercices.index')->with('success', 'Exercice modifié avec succès');
}

    public function destroy($id)
    {
        Exercice::findOrFail($id)->delete();

        return redirect()
            ->route('exercices.index')
            ->with('success', 'Exercice supprimé.');
    }
}