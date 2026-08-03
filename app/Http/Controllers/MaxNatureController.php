<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\NaturePrestation;
use App\Models\ExerciceNatureMax;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaxNatureController extends Controller
{
    public function index(Request $request)
    {
        $exercices = Exercice::orderByDesc('annee')->get();

        $idExercice = $request->input(
            'id_exercice',
            $exercices->first()->id_exercice ?? null
        );

        $lignes = [];

        if ($idExercice) {

            // Toutes les natures de prestation existantes
            $natures = NaturePrestation::with('typeCategorie')->get();

            // Montants max déjà enregistrés pour cet exercice
            $maxExistants = ExerciceNatureMax::where('id_exercice', $idExercice)
                ->get()
                ->keyBy('code_nat_prest');

            $lignes = $natures->map(function ($nature) use ($maxExistants) {
                return [
                    'code_nat_prest'  => $nature->code_nat_prest,
                    'intitule_fr'     => $nature->intitule_fr,
                    'type_categorie'  => $nature->typeCategorie?->libelle,
                    'montant_max'     => (float) ($maxExistants[$nature->code_nat_prest]->montant_max ?? 0),
                ];
            })->values();
        }

        return Inertia::render('MaxNature/Index', [
            'exercices'   => $exercices,
            'id_exercice' => $idExercice,
            'lignes'      => $lignes,
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            'id_exercice'                => 'required|integer|exists:exercices,id_exercice',
            'montants'                   => 'required|array',
            'montants.*.code_nat_prest'  => 'required|string|exists:nature_prestations,code_nat_prest',
            'montants.*.montant_max'     => 'required|numeric|min:0',
        ]);

        foreach ($request->input('montants') as $ligne) {
            ExerciceNatureMax::updateOrCreate(
                [
                    'id_exercice'     => $request->input('id_exercice'),
                    'code_nat_prest'  => $ligne['code_nat_prest'],
                ],
                [
                    'montant_max' => $ligne['montant_max'],
                ]
            );
        }

        return redirect()
            ->route('max-nature.index', ['id_exercice' => $request->input('id_exercice')])
            ->with('success', 'Montants max enregistrés.');
    }
}