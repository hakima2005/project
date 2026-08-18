<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\SituationBudgetaire;
use App\Models\TypeCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategorieController extends Controller
{
    public function index(Request $request)
    {
        // جميع exercices
        $exercices = Exercice::orderBy('annee')->get([
            'id_exercice',
            'annee',
        ]);

        // exercice sélectionné
        $idExercice = $request->input('id_exercice');

        /*
         * جميع Types catégories actifs
         * ومع كل Type جميع Natures de prestation ديالو
         */
        $types = TypeCategorie::query()
            ->where('id_statut', 1)
            ->with([
                'naturePrestations' => function ($query) {
                    $query
                        ->where('id_statut', 1)
                        ->orderBy('code_nat_prest');
                }
            ])
            ->orderBy('id_type_categorie')
            ->get();

        /*
         * Situations budgétaires ديال exercice
         *
         * Budget affecté كيجينا من هنا،
         * ماشي من categories.
         */
        $situations = collect();

        if ($idExercice) {
            $situations = SituationBudgetaire::query()
                ->where('id_exercice', $idExercice)
                ->get([
                    'id_type_categorie',
                    'montant',
                ])
                ->keyBy('id_type_categorie');
        }

        /*
         * تجهيز البيانات للـReact بشكل صريح
         */
        $typesCategories = $types->map(function ($type) use ($situations) {

            $situation = $situations->get(
                $type->id_type_categorie
            );

            return [
                'id_type_categorie' => $type->id_type_categorie,

                'libelle' => $type->libelle,

                // Budget من SituationBudgetaire
                'budget_affecte' => $situation
                    ? (float) $situation->montant
                    : 0,

                // Natures de prestation ديال هاد Type
                'naturePrestations' => $type->naturePrestations->map(
                    function ($nature) {
                        return [
                            'code_nat_prest' => $nature->code_nat_prest,
                            'intitule_fr' => $nature->intitule_fr,
                        ];
                    }
                )->values()->toArray(),
            ];
        })->values()->toArray();

        return Inertia::render(
            'Categorie/Index',
            [
                'exercices' => $exercices,

                'typesCategories' => $typesCategories,

                'id_exercice' => $idExercice,
            ]
        );
    }
}