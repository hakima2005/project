<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\ExerciceTypeMt;
use App\Models\TypeMt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SituationBudgetaireController extends Controller
{
    public function index(Request $request)
    {
        $exercices = Exercice::orderByDesc('annee')->get();

        $idExercice = $request->input(
            'id_exercice',
            $exercices->first()->id_exercice ?? null
        );

        $lignes = [];
        $montantGlobal = 0;

        if ($idExercice) {

            $types = TypeMt::orderBy('libelle')->get();

            $existants = ExerciceTypeMt::where('id_exercice', $idExercice)
                ->get()
                ->keyBy('id_type_mt');

            $lignes = $types->map(function ($type) use ($existants) {
                $existant = $existants->get($type->id_type_mt);

                return [
                    'id_type_mt' => $type->id_type_mt,
                    'libelle' => $type->libelle,
                    'n_compte' => $existant->n_compte ?? '',
                    'montant' => $existant->montant ?? 0,
                ];
            })->values();

            $montantGlobal = ExerciceTypeMt::where(
                'id_exercice',
                $idExercice
            )->sum('montant');
        }

        return Inertia::render('SituationBudgetaire/Index', [
            'exercices' => $exercices,
            'id_exercice' => $idExercice,
            'lignes' => $lignes,
            'montant_global' => $montantGlobal,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_exercice' => 'required|exists:exercices,id_exercice',
            'lignes' => 'required|array',
            'lignes.*.id_type_mt' => 'required|exists:type_mts,id_type_mt',
            'lignes.*.n_compte' => 'nullable|string',
            'lignes.*.montant' => 'required|numeric|min:0',
        ]);

        foreach ($validated['lignes'] as $ligne) {
            ExerciceTypeMt::updateOrCreate(
                [
                    'id_exercice' => $validated['id_exercice'],
                    'id_type_mt' => $ligne['id_type_mt'],
                ],
                [
                    'n_compte' => $ligne['n_compte'],
                    'montant' => $ligne['montant'],
                ]
            );
        }

        return redirect()->back()->with('success', 'Situation budgétaire enregistrée.');
    }
}