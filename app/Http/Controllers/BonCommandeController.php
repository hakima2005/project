<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\BonCommande;
use App\Models\Fournisseur;
use App\Models\Libelle;
use App\Models\Exercice;
use App\Models\NaturePrestation;
use App\Models\StatutBC;
use App\Models\Unite;
use App\Models\DecretTva;
use App\Models\DecretRas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BonCommandeController extends Controller
{
    // =========================================================
    // TRANSITIONS DES STATUTS
    // =========================================================

    private array $transitions = [
        'Créé'                  => ['Brouillon', 'Publié'],
        'Brouillon'             => ['Publié'],
        'Publié'                => ['Attribué'],
        'Attribué'              => ['En cours d\'exécution', 'Annulé'],
        'En cours d\'exécution' => ['Terminé', 'Annulé'],
        'Terminé'               => [],
        'Annulé'                => [],
    ];


    // =========================================================
    // INDEX
    // =========================================================

    public function index()
    {
        $bcs = BonCommande::with(
            'exercice',
            'libelle',
            'statutBC',
            'naturePrestation'
        )->get();

        return Inertia::render('BonCommande/Index', [
            'bons_commande' => $bcs,
            'statuts_bc'    => StatutBC::orderBy('ordre')->get(),
        ]);
    }


    // =========================================================
    // CREATE
    // =========================================================

    public function create()
    {
        return Inertia::render('BonCommande/Create', [
            'exercices'          => Exercice::all(),
            'libelles'           => Libelle::all(),
            'natures_prestation' => NaturePrestation::all(),
        ]);
    }


    // =========================================================
    // STORE
    // =========================================================

    public function store(Request $request)
    {
        $request->validate([
            'reference_bc'   => 'required|string|max:50|unique:bons_commande,reference_bc',
            'objet'          => 'required|string',
            'id_exercice'    => 'required|integer',
            'code_libelle'   => 'required|string',
            'code_nat_prest' => 'required|string',
            'garanti'        => 'boolean',
        ]);


        // =====================================================
        // RECHERCHE DU TAUX TVA
        // =====================================================
        //
        // On prend le dernier décret TVA enregistré
        // pour la nature de prestation sélectionnée.
        //
        // IMPORTANT :
        // On ne filtre PAS par date_creation du BC.
        //
        // =====================================================

        $tauxTva = DecretTva::where(
            'code_nat_prest',
            $request->code_nat_prest
        )
            ->orderByDesc('date')
            ->value('taux') ?? 0;


        // =====================================================
        // RECHERCHE DU TAUX RAS
        // =====================================================

        $tauxRas = DecretRas::where(
            'code_nat_prest',
            $request->code_nat_prest
        )
            ->orderByDesc('date')
            ->value('taux') ?? 0;


        // =====================================================
        // STATUT INITIAL
        // =====================================================

        $statutInitial = StatutBC::orderBy('ordre')->first();


        // =====================================================
        // CREATION DU BON DE COMMANDE
        // =====================================================

        BonCommande::create([
            'reference_bc'       => $request->reference_bc,

            'objet'              => $request->objet,

            'id_exercice'        => $request->id_exercice,

            'code_libelle'       => $request->code_libelle,

            'code_nat_prest'     => $request->code_nat_prest,

            'id_statut_bc'       => $statutInitial?->id_statut_bc,

            // TVA récupérée depuis decret_tva
            'tva_applicable'     => $tauxTva,

            // RAS récupérée depuis decret_ras
            'retenue_applicable' => $tauxRas,

            'date_creation'      => $request->date_creation,

            'date_mise_en_ligne' => $request->date_mise_en_ligne,

            'date_limite_devis'  => $request->date_limite_devis,

            'observations'       => $request->observations,

            'garanti'            => $request->boolean('garanti'),

            'montant_estimatif'  => 0,
        ]);


        // =====================================================
        // MESSAGE DE CONFIRMATION
        // =====================================================

        return redirect()
            ->route('bons-commande.index')
            ->with(
                'success',
                "Bon de commande créé — TVA {$tauxTva}% et RAS {$tauxRas}% appliqués selon les décrets enregistrés."
            );
    }


    // =========================================================
    // SHOW
    // =========================================================

    public function show($reference)
    {
        $bc = BonCommande::with(
            'exercice',
            'libelle',
            'statutBC',
            'naturePrestation',
            'designations.unite',
            'devis.fournisseur',
            'fournisseurs'
        )->findOrFail($reference);


        return Inertia::render('BonCommande/Show', [
            'bon_commande' => $bc,

            'unites' => Unite::all(),

            'statuts_bc' => StatutBC::orderBy('ordre')->get(),
        ]);
    }


    // =========================================================
    // EDIT
    // =========================================================

    public function edit($reference)
    {
        return Inertia::render('BonCommande/Edit', [

            'bon_commande' => BonCommande::with('statutBC')
                ->findOrFail($reference),

            'exercices' => Exercice::all(),

            'libelles' => Libelle::all(),

            'natures_prestation' => NaturePrestation::all(),
        ]);
    }


    // =========================================================
    // UPDATE
    // =========================================================

    public function update(Request $request, $reference)
    {
        $bc = BonCommande::findOrFail($reference);


        $request->validate([
            'objet' => 'required|string',
        ]);


        // On ne permet pas de modifier le statut
        // depuis cette méthode.
        $bc->update(
            $request->except('id_statut_bc')
        );


        return redirect()
            ->route('bons-commande.index')
            ->with(
                'success',
                'Bon de commande mis à jour.'
            );
    }


    // =========================================================
    // CHANGER STATUT
    // =========================================================

    public function changerStatut(
        Request $request,
        $reference
    ) {
        $bc = BonCommande::findOrFail($reference);


        $request->validate([
            'id_statut_bc' =>
                'required|integer|exists:statut_bc,id_statut_bc',
        ]);


        $nouveauStatut = StatutBC::findOrFail(
            $request->id_statut_bc
        );


        $statutActuel =
            $bc->statutBC?->nom_fr ?? 'Créé';


        $autorises =
            $this->transitions[$statutActuel] ?? [];


        // =====================================================
        // VERIFICATION TRANSITION
        // =====================================================

        if (!in_array(
            $nouveauStatut->nom_fr,
            $autorises
        )) {
            return back()->withErrors([
                'id_statut_bc' =>
                    "Passage de \"$statutActuel\" à \"{$nouveauStatut->nom_fr}\" non autorisé.",
            ]);
        }


        // =====================================================
        // REGLE ATTRIBUTION
        // =====================================================

        if ($nouveauStatut->nom_fr === 'Attribué') {

            if (!$bc->date_limite_devis) {
                return back()->withErrors([
                    'id_statut_bc' =>
                        "Impossible d'attribuer ce bon de commande : aucune date limite de devis n'est définie.",
                ]);
            }


            $dateLimite = Carbon::parse(
                $bc->date_limite_devis
            )->startOfDay();


            $aujourdHui = Carbon::today();


            if ($aujourdHui->lt($dateLimite)) {
                return back()->withErrors([
                    'id_statut_bc' =>
                        "L'attribution est interdite avant la date limite des devis ({$dateLimite->format('d/m/Y')}).",
                ]);
            }
        }


        // =====================================================
        // TERMINE
        // =====================================================
        //
        // Facture : obligatoire
        // Bon de livraison : optionnel
        //
        // =====================================================

        if ($nouveauStatut->nom_fr === 'Terminé') {

            $validated = $request->validate([

                'piece_jointe_facture' =>
                    'required|file|mimes:pdf,jpg,jpeg,png|max:5120',

                'bon_livraison' =>
                    'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            ]);


            $data = [
                'id_statut_bc' =>
                    $nouveauStatut->id_statut_bc,
            ];


            // =================================================
            // PIECE JOINTE FACTURE
            // =================================================

            if ($request->hasFile(
                'piece_jointe_facture'
            )) {

                $data['piece_jointe_facture'] =
                    $request
                        ->file('piece_jointe_facture')
                        ->store(
                            'pieces-facture',
                            'public'
                        );
            }


            // =================================================
            // BON DE LIVRAISON
            // =================================================

            if ($request->hasFile(
                'bon_livraison'
            )) {

                $data['bon_livraison'] =
                    $request
                        ->file('bon_livraison')
                        ->store(
                            'bons-livraison',
                            'public'
                        );
            }


            $bc->update($data);


            return back()->with(
                'success',
                'Le bon de commande est terminé. La facture a été enregistrée.'
            );
        }


        // =====================================================
        // ANNULATION
        // =====================================================

        if ($nouveauStatut->nom_fr === 'Annulé') {

            // =================================================
            // ATTRIBUÉ → ANNULÉ
            // =================================================

            if ($statutActuel === 'Attribué') {

                $validated = $request->validate([

                    'piece_jointe_fournisseur' =>
                        'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
                ]);


                $data = [

                    'id_statut_bc' =>
                        $nouveauStatut->id_statut_bc,

                    'date_annulation' =>
                        now()->toDateString(),
                ];


                // =================================================
                // PIECE FOURNISSEUR
                // =================================================

                if ($request->hasFile(
                    'piece_jointe_fournisseur'
                )) {

                    $data['piece_jointe_fournisseur'] =
                        $request
                            ->file('piece_jointe_fournisseur')
                            ->store(
                                'pieces-fournisseur-annulation',
                                'public'
                            );
                }


                // =================================================
                // CAUTION
                // =================================================
                //
                // Si le BC est garanti et annulé :
                // la caution n'est PAS restituée.
                //
                // =================================================

                if ($bc->garanti) {

                    $data['caution_restituee'] = false;
                }


                $bc->update($data);


                return back()->with(
                    'success',
                    'Le BC attribué a été annulé. La pièce jointe du fournisseur a été enregistrée.'
                );
            }


            // =================================================
            // EN COURS D'EXECUTION → ANNULE
            // =================================================

            if (
                $statutActuel ===
                "En cours d'exécution"
            ) {

                $validated = $request->validate([

                    'motif_annulation' =>
                        'required|string|min:5',

                    'documents_annulation' =>
                        'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
                ]);


                $data = [

                    'id_statut_bc' =>
                        $nouveauStatut->id_statut_bc,

                    'motif_annulation' =>
                        $validated['motif_annulation'],

                    'date_annulation' =>
                        now()->toDateString(),
                ];


                // =================================================
                // DOCUMENT ANNULATION
                // =================================================

                if ($request->hasFile(
                    'documents_annulation'
                )) {

                    $data['documents_annulation'] =
                        $request
                            ->file('documents_annulation')
                            ->store(
                                'documents-annulation',
                                'public'
                            );
                }


                // =================================================
                // CAUTION
                // =================================================

                if ($bc->garanti) {

                    $data['caution_restituee'] = false;
                }


                $bc->update($data);


                return back()->with(
                    'success',
                    'Le bon de commande en cours d’exécution a été annulé avec succès.'
                );
            }


            // =================================================
            // AUTRE ANNULATION
            // =================================================

            $bc->update([

                'id_statut_bc' =>
                    $nouveauStatut->id_statut_bc,

                'date_annulation' =>
                    now()->toDateString(),
            ]);


            return back()->with(
                'success',
                'Statut mis à jour.'
            );
        }


        // =====================================================
        // AUTRES CHANGEMENTS DE STATUT
        // =====================================================

        $bc->update([

            'id_statut_bc' =>
                $nouveauStatut->id_statut_bc,
        ]);


        return back()->with(
            'success',
            'Statut mis à jour.'
        );
    }


    // =========================================================
    // ATTRIBUER - AFFICHER PAGE
    // =========================================================

    public function attribuer($reference)
    {
        $bc = BonCommande::with([
            'devis.fournisseur',
            'fournisseurAttribue',
        ])
            ->where(
                'reference_bc',
                $reference
            )
            ->firstOrFail();


        if ((int) $bc->id_statut_bc !== 3) {

            return redirect()
                ->route('bons-commande.index')
                ->with(
                    'error',
                    'Ce bon de commande ne peut pas être attribué dans son statut actuel.'
                );
        }


        if (!$bc->date_limite_devis) {

            return redirect()
                ->route('bons-commande.index')
                ->with(
                    'error',
                    'Aucune date limite de devis n’est définie.'
                );
        }


        $dateLimite = Carbon::parse(
            $bc->date_limite_devis
        )->startOfDay();


        $aujourdHui = Carbon::today();


        if ($aujourdHui->lt($dateLimite)) {

            return redirect()
                ->route('bons-commande.index')
                ->with(
                    'error',
                    "L'attribution est interdite avant la date limite des devis ({$dateLimite->format('d/m/Y')})."
                );
        }


        return Inertia::render(
            'BonCommande/Attribution',
            [
                'bon_commande' => $bc,

                'devis' => $bc->devis,

                'fournisseurs' => Fournisseur::all(),
            ]
        );
    }


    // =========================================================
    // CONFIRMER ATTRIBUTION
    // =========================================================

    public function confirmerAttribution(
        Request $request,
        $reference
    ) {
        $bc = BonCommande::where(
            'reference_bc',
            $reference
        )->firstOrFail();


        if ((int) $bc->id_statut_bc !== 3) {

            return back()->with(
                'error',
                'Le BC doit être publié avant l’attribution.'
            );
        }


        if (!$bc->date_limite_devis) {

            return back()->with(
                'error',
                'Aucune date limite de devis n’est définie.'
            );
        }


        $dateLimite = Carbon::parse(
            $bc->date_limite_devis
        )->startOfDay();


        $aujourdHui = Carbon::today();


        if ($aujourdHui->lt($dateLimite)) {

            return back()->with(
                'error',
                "L'attribution est interdite avant la date limite des devis ({$dateLimite->format('d/m/Y')})."
            );
        }


        // =====================================================
        // VALIDATION
        // =====================================================

        $rules = [

            'id_fournisseur_attribue' =>
                'required|integer|exists:fournisseurs,id_fournisseur',

            'nombre_devis' =>
                'required|integer|min:1',

            'montant_ht' =>
                'required|numeric|min:0',
        ];


        // =====================================================
        // CAUTION
        // =====================================================

        if ($bc->garanti) {

            $rules['justificatif_caution'] =
                'required|file|mimes:pdf,jpg,jpeg,png|max:5120';

        } else {

            $rules['justificatif_caution'] =
                'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120';
        }


        $validated =
            $request->validate($rules);


        // =====================================================
        // DONNEES ATTRIBUTION
        // =====================================================

        $data = [

            'id_fournisseur_attribue' =>
                $validated['id_fournisseur_attribue'],

            'nombre_devis' =>
                $validated['nombre_devis'],

            'montant_ht' =>
                $validated['montant_ht'],

            'id_statut_bc' => 6,
        ];


        // =====================================================
        // JUSTIFICATIF CAUTION
        // =====================================================

        if ($request->hasFile(
            'justificatif_caution'
        )) {

            $data['justificatif_caution'] =
                $request
                    ->file('justificatif_caution')
                    ->store(
                        'justificatifs-caution',
                        'public'
                    );
        }


        $bc->update($data);


        return redirect()
            ->route('bons-commande.index')
            ->with(
                'success',
                'Le bon de commande a été attribué avec succès.'
            );
    }


    // =========================================================
    // DESTROY
    // =========================================================

    public function destroy($reference)
    {
        $bc = BonCommande::findOrFail(
            $reference
        );


        $bc->designations()->delete();

        $bc->devis()->delete();

        $bc->delete();


        return redirect()
            ->route('bons-commande.index')
            ->with(
                'success',
                'Bon de commande supprimé.'
            );
    }
}