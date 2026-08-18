<?php

namespace App\Http\Controllers;

use App\Models\Exercice;
use App\Models\ExerciceTypeMt;
use App\Models\SituationBudgetaire;
use App\Models\TypeCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SituationBudgetaireController extends Controller
{
    public function index(Request $request)
    {
        // جميع exercices
        $exercices = Exercice::orderByDesc('annee')->get([
            'id_exercice',
            'annee',
        ]);

        // exercice المختار
        $idExercice = $request->input(
            'id_exercice',
            $exercices->first()->id_exercice ?? null
        );

        $exercice = null;
        $exercicePrecedent = null;

        $typesCategories = collect();
        $situations = collect();

        $montantGlobal = 0;

        if ($idExercice) {

            /*
             * =====================================================
             * 1. EXERCICE ACTUEL
             * =====================================================
             */
            $exercice = Exercice::where(
                'id_exercice',
                $idExercice
            )->first();

            if ($exercice) {

                /*
                 * =================================================
                 * 2. MONTANT GLOBAL DE L'EXERCICE
                 *
                 * مهم:
                 * ماشي مجموع situations budgetaires
                 * وماشي مجموع Types catégories.
                 *
                 * كنجيبو budget ديال exercice من exercice_type_mts.
                 * =================================================
                 */
                $montantGlobal = ExerciceTypeMt::where(
                    'id_exercice',
                    $idExercice
                )->sum('montant');


                /*
                 * =================================================
                 * 3. EXERCICE PRECEDENT
                 *
                 * مثال:
                 * 2028 -> 2027
                 * 2027 -> 2026
                 * =================================================
                 */
                $exercicePrecedent = Exercice::where(
                    'annee',
                    '<',
                    $exercice->annee
                )
                    ->orderByDesc('annee')
                    ->first();


                /*
                 * =================================================
                 * 4. TOUS LES TYPES CATEGORIES
                 *
                 * ماشي غير اللي عندهم categories.
                 * =================================================
                 */
                $typesCategories = TypeCategorie::where(
                    'id_statut',
                    1
                )
                    ->orderBy('id_type_categorie')
                    ->get([
                        'id_type_categorie',
                        'libelle',
                        'id_statut',
                    ]);


                /*
                 * =================================================
                 * 5. SITUATIONS DE L'EXERCICE ACTUEL
                 * =================================================
                 */
                $situations = SituationBudgetaire::where(
                    'id_exercice',
                    $idExercice
                )
                    ->get()
                    ->keyBy('id_type_categorie');
            }
        }


        /*
         * =========================================================
         * 6. PREPARATION DES LIGNES
         *
         * كل Type catégorie غادي يكون عندو row.
         * =========================================================
         */
        $lignes = $typesCategories->map(function ($type) use (
            $situations,
            $exercicePrecedent
        ) {

            /*
             * واش كاينة situation déjà مسجلة فهاد exercice؟
             */
            $situationActuelle = $situations->get(
                $type->id_type_categorie
            );


            /*
             * إذا كانت situation موجودة:
             * نستعمل البيانات المحفوظة.
             */
            if ($situationActuelle) {

                return [
                    'id_type_categorie' => $type->id_type_categorie,
                    'libelle' => $type->libelle,

                    'n_compte' => $situationActuelle->n_compte,

                    'montant' => (float) $situationActuelle->montant,

                    'reste_a_payer' => (float) $situationActuelle->reste_a_payer,
                ];
            }


            /*
             * =====================================================
             * إذا مازال ما تسجلاتش situation:
             *
             * كنحاولو نجيبو reste à payer من exercice السابق.
             * =====================================================
             */
            $restePrecedent = 0;


            if ($exercicePrecedent) {

                $restePrecedent = SituationBudgetaire::where(
                    'id_exercice',
                    $exercicePrecedent->id_exercice
                )
                    ->where(
                        'id_type_categorie',
                        $type->id_type_categorie
                    )
                    ->value('reste_a_payer') ?? 0;
            }


            return [
                'id_type_categorie' => $type->id_type_categorie,

                'libelle' => $type->libelle,

                'n_compte' => '',

                'montant' => 0,

                'reste_a_payer' => (float) $restePrecedent,
            ];
        })->values();


        return Inertia::render(
            'SituationBudgetaire/Index',
            [
                'exercices' => $exercices,

                'id_exercice' => $idExercice,

                'exercice' => $exercice,

                'exercice_precedent' => $exercicePrecedent,

                'lignes' => $lignes,

                'montant_global' => (float) $montantGlobal,
            ]
        );
    }


    /*
     * =============================================================
     * ENREGISTRER TOUTES LES LIGNES دفعة وحدة
     * =============================================================
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_exercice' => [
                'required',
                'exists:exercices,id_exercice',
            ],

            'lignes' => [
                'required',
                'array',
                'min:1',
            ],

            'lignes.*.id_type_categorie' => [
                'required',
                'exists:type_categories,id_type_categorie',
            ],

            'lignes.*.n_compte' => [
                'required',
                'string',
                'max:50',
            ],

            'lignes.*.montant' => [
                'required',
                'numeric',
                'min:0',
            ],

            'lignes.*.reste_a_payer' => [
                'required',
                'numeric',
                'min:0',
            ],
        ]);


        /*
         * =========================================================
         * حفظ جميع الصفوف
         * =========================================================
         */
        foreach ($validated['lignes'] as $ligne) {

            SituationBudgetaire::updateOrCreate(
                [
                    'id_exercice' => $validated['id_exercice'],

                    'id_type_categorie' =>
                        $ligne['id_type_categorie'],
                ],

                [
                    'n_compte' => $ligne['n_compte'],

                    'montant' => $ligne['montant'],

                    'reste_a_payer' =>
                        $ligne['reste_a_payer'],
                ]
            );
        }


        return redirect()
            ->back()
            ->with(
                'success',
                'Situation budgétaire enregistrée avec succès.'
            );
    }
}