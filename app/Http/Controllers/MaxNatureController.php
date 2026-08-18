<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\ExerciceNatureMax;
use App\Models\NaturePrestation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaxNatureController extends Controller
{
    /**
     * Listing des Max Nature enregistrées par exercice
     */
    public function index(Request $request)
    {
        $exercices = Exercice::orderBy('annee')->get([
            'id_exercice',
            'annee',
        ]);

        $idExercice = $request->input('id_exercice');

        $maxNatures = collect();

        if ($idExercice) {
            $maxNatures = ExerciceNatureMax::with('naturePrestation')
                ->where('id_exercice', $idExercice)
                ->orderBy('code_nat_prest')
                ->get([
                    'id',
                    'id_exercice',
                    'code_nat_prest',
                    'montant_max',
                ]);
        }

        return Inertia::render('MaxNature/Index', [
            'exercices' => $exercices,
            'id_exercice' => $idExercice,
            'maxNatures' => $maxNatures,
        ]);
    }


    /**
     * Page d'ajout d'une Max Nature
     */
    public function create()
    {
        $exercices = Exercice::orderBy('annee')->get([
            'id_exercice',
            'annee',
        ]);

        /*
         * On récupère TOUTES les natures de prestation.
         *
         * Pas de Type catégorie ici.
         * Pas de filtre sur le statut.
         *
         * Si une nouvelle nature est créée dans
         * nature_prestations, elle apparaîtra automatiquement
         * dans cette page.
         */
        $natures = NaturePrestation::orderBy('code_nat_prest')
            ->get([
                'code_nat_prest',
                'intitule_fr',
                'intitule_ar',
            ]);

        return Inertia::render('MaxNature/Create', [
            'exercices' => $exercices,
            'natures' => $natures,
        ]);
    }


    /**
     * Enregistrer les Max Nature
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_exercice' => [
                'required',
                'exists:exercices,id_exercice',
            ],

            'natures' => [
                'required',
                'array',
                'min:1',
            ],

            'natures.*.code_nat_prest' => [
                'required',
                'exists:nature_prestations,code_nat_prest',
            ],

            'natures.*.montant_max' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);

        /*
         * كل Nature كتتسجل بالنسبة للـ Exercice المختار.
         *
         * إذا كانت موجودة:
         * update montant_max
         *
         * إذا ما كانتش موجودة:
         * create record جديدة
         */
        foreach ($validated['natures'] as $nature) {

            ExerciceNatureMax::updateOrCreate(
                [
                    'id_exercice' => $validated['id_exercice'],
                    'code_nat_prest' => $nature['code_nat_prest'],
                ],
                [
                    'montant_max' => $nature['montant_max'],
                ]
            );
        }

        return redirect()
            ->route('max-nature.index', [
                'id_exercice' => $validated['id_exercice'],
            ])
            ->with(
                'success',
                'Les montants maximum ont été enregistrés avec succès.'
            );
    }
}