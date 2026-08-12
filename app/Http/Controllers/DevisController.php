<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use App\Models\BonCommande;
use App\Models\Fournisseur;
use App\Models\DecretTva;
use App\Models\DecretRas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevisController extends Controller
{
    /**
     * =========================================================
     * INDEX
     * =========================================================
     */
    public function index()
    {
        $devis = Devis::with([
            'fournisseur',
            'bonCommande',
            'statut',
        ])
            ->orderByDesc('id_devis')
            ->get();

        return Inertia::render('Devis/Index', [
            'devis' => $devis,
        ]);
    }


    /**
     * =========================================================
     * CREATE
     * =========================================================
     */
    public function create()
    {
        /*
         * On récupère uniquement les BC utiles.
         * On charge également les relations nécessaires
         * pour afficher l'objet et les taux TVA/RAS.
         */
        $bonsCommande = BonCommande::with([
            'naturePrestation',
        ])
            ->orderByDesc('reference_bc')
            ->get();

        $fournisseurs = Fournisseur::orderBy(
            'raison_sociale'
        )->get();

        return Inertia::render('Devis/Create', [
            'bons_commande' => $bonsCommande,
            'fournisseurs'  => $fournisseurs,
        ]);
    }


    /**
     * =========================================================
     * STORE
     * =========================================================
     */
    public function store(Request $request)
    {
        /*
         * Validation des données envoyées par React.
         */
        $validated = $request->validate([
            'reference_bc' => [
                'required',
                'string',
                'exists:bons_commande,reference_bc',
            ],

            'id_fournisseur' => [
                'required',
                'integer',
                'exists:fournisseurs,id_fournisseur',
            ],

            'reference_devis' => [
                'required',
                'string',
                'max:100',
            ],

            'date_devis' => [
                'required',
                'date',
            ],

            'montant_ht' => [
                'required',
                'numeric',
                'min:0',
            ],

            'observation' => [
                'nullable',
                'string',
            ],
        ]);


        /**
         * =====================================================
         * RECUPERATION DU BC
         * =====================================================
         */
        $bc = BonCommande::with('naturePrestation')
            ->where(
                'reference_bc',
                $validated['reference_bc']
            )
            ->firstOrFail();


        /**
         * =====================================================
         * CODE NATURE PRESTATION
         * =====================================================
         */
        $codeNatPrest = $bc->code_nat_prest;


        /**
         * =====================================================
         * TAUX TVA
         * =====================================================
         *
         * On cherche le dernier décret TVA applicable
         * à la date du devis.
         */
        $tauxTva = DecretTva::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $validated['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');


        /*
         * Si aucun décret n'existe :
         * taux = 0
         */
        $tauxTva = $tauxTva !== null
            ? (float) $tauxTva
            : 0;


        /**
         * =====================================================
         * TAUX RAS
         * =====================================================
         *
         * On cherche le dernier décret RAS applicable
         * à la date du devis.
         */
        $tauxRas = DecretRas::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $validated['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');


        /*
         * Si aucun décret n'existe :
         * taux = 0
         */
        $tauxRas = $tauxRas !== null
            ? (float) $tauxRas
            : 0;


        /**
         * =====================================================
         * CALCULS
         * =====================================================
         */
        $montantHt = (float) $validated['montant_ht'];


        /*
         * TVA = HT × taux TVA / 100
         */
        $montantTva = round(
            $montantHt * $tauxTva / 100,
            2
        );


        /*
         * RAS = HT × taux RAS / 100
         */
        $montantRetenue = round(
            $montantHt * $tauxRas / 100,
            2
        );


        /*
         * TTC = HT + TVA
         *
         * La retenue RAS reste séparée.
         */
        $montantTtc = round(
            $montantHt + $montantTva,
            2
        );


        /**
         * =====================================================
         * CREATION DU DEVIS
         * =====================================================
         */
        Devis::create([
            'reference_devis' => $validated['reference_devis'],

            'date_devis' => $validated['date_devis'],

            'reference_bc' => $validated['reference_bc'],

            'id_fournisseur' => $validated['id_fournisseur'],

            'montant_ht' => $montantHt,

            'montant_tva' => $montantTva,

            'montant_retenue' => $montantRetenue,

            'montant_ttc' => $montantTtc,

            'observation' => $validated['observation'] ?? null,

            /*
             * Nouveau devis = reçu.
             * Si ta table possède une valeur par défaut,
             * cette valeur sera conservée.
             */
            'id_statut' => 1,
        ]);


        /**
         * =====================================================
         * MESSAGE
         * =====================================================
         */
        return redirect()
            ->route('devis.index')
            ->with(
                'success',
                "Devis créé avec succès. TVA : {$tauxTva}% — RAS : {$tauxRas}%."
            );
    }


    /**
     * =========================================================
     * SHOW
     * =========================================================
     */
    public function show($id)
    {
        $devis = Devis::with([
            'fournisseur',
            'bonCommande',
            'statut',
        ])
            ->findOrFail($id);

        return Inertia::render('Devis/Show', [
            'devis' => $devis,
        ]);
    }


    /**
     * =========================================================
     * EDIT
     * =========================================================
     */
    public function edit($id)
    {
        $devis = Devis::findOrFail($id);

        $bonsCommande = BonCommande::with(
            'naturePrestation'
        )
            ->orderByDesc('reference_bc')
            ->get();

        $fournisseurs = Fournisseur::orderBy(
            'raison_sociale'
        )->get();

        return Inertia::render('Devis/Edit', [
            'devis' => $devis,

            'bons_commande' => $bonsCommande,

            'fournisseurs' => $fournisseurs,
        ]);
    }


    /**
     * =========================================================
     * UPDATE
     * =========================================================
     */
    public function update(
        Request $request,
        $id
    ) {
        $devis = Devis::findOrFail($id);


        $validated = $request->validate([
            'reference_bc' => [
                'required',
                'string',
                'exists:bons_commande,reference_bc',
            ],

            'id_fournisseur' => [
                'required',
                'integer',
                'exists:fournisseurs,id_fournisseur',
            ],

            'reference_devis' => [
                'required',
                'string',
                'max:100',
            ],

            'date_devis' => [
                'required',
                'date',
            ],

            'montant_ht' => [
                'required',
                'numeric',
                'min:0',
            ],

            'observation' => [
                'nullable',
                'string',
            ],
        ]);


        /**
         * =====================================================
         * BC
         * =====================================================
         */
        $bc = BonCommande::where(
            'reference_bc',
            $validated['reference_bc']
        )
            ->firstOrFail();


        /**
         * =====================================================
         * CODE NATURE
         * =====================================================
         */
        $codeNatPrest = $bc->code_nat_prest;


        /**
         * =====================================================
         * TVA
         * =====================================================
         */
        $tauxTva = DecretTva::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $validated['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');


        $tauxTva = $tauxTva !== null
            ? (float) $tauxTva
            : 0;


        /**
         * =====================================================
         * RAS
         * =====================================================
         */
        $tauxRas = DecretRas::where(
            'code_nat_prest',
            $codeNatPrest
        )
            ->where(
                'date',
                '<=',
                $validated['date_devis']
            )
            ->orderByDesc('date')
            ->value('taux');


        $tauxRas = $tauxRas !== null
            ? (float) $tauxRas
            : 0;


        /**
         * =====================================================
         * CALCUL
         * =====================================================
         */
        $montantHt = (float) $validated['montant_ht'];


        $montantTva = round(
            $montantHt * $tauxTva / 100,
            2
        );


        $montantRetenue = round(
            $montantHt * $tauxRas / 100,
            2
        );


        $montantTtc = round(
            $montantHt + $montantTva,
            2
        );


        /**
         * =====================================================
         * UPDATE
         * =====================================================
         */
        $devis->update([
            'reference_bc' => $validated['reference_bc'],

            'id_fournisseur' =>
                $validated['id_fournisseur'],

            'reference_devis' =>
                $validated['reference_devis'],

            'date_devis' =>
                $validated['date_devis'],

            'montant_ht' =>
                $montantHt,

            'montant_tva' =>
                $montantTva,

            'montant_retenue' =>
                $montantRetenue,

            'montant_ttc' =>
                $montantTtc,

            'observation' =>
                $validated['observation'] ?? null,
        ]);


        return redirect()
            ->route('devis.index')
            ->with(
                'success',
                'Devis mis à jour avec succès.'
            );
    }


    /**
     * =========================================================
     * RETENIR UN DEVIS
     * =========================================================
     */
    public function retenir($id)
    {
        $devis = Devis::findOrFail($id);


        /**
         * Tous les autres devis du même BC
         * deviennent rejetés.
         */
        Devis::where(
            'reference_bc',
            $devis->reference_bc
        )
            ->where(
                'id_devis',
                '!=',
                $devis->id_devis
            )
            ->update([
                'id_statut' => 3,
            ]);


        /**
         * Le devis sélectionné devient retenu.
         */
        $devis->update([
            'id_statut' => 2,
        ]);


        /**
         * Le BC passe au statut attribué.
         */
        BonCommande::where(
            'reference_bc',
            $devis->reference_bc
        )
            ->update([
                'id_statut_bc' => 6,
            ]);


        return redirect()
            ->back()
            ->with(
                'success',
                'Devis retenu avec succès.'
            );
    }


    /**
     * =========================================================
     * DESTROY
     * =========================================================
     */
    public function destroy($id)
    {
        $devis = Devis::findOrFail($id);

        $devis->delete();

        return redirect()
            ->route('devis.index')
            ->with(
                'success',
                'Devis supprimé avec succès.'
            );
    }
}