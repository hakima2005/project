<?php
namespace App\Http\Controllers;

use App\Models\BonCommande;
use App\Models\Libelle;
use App\Models\Exercice;
use App\Models\NaturePrestation;
use App\Models\StatutBC;
use App\Models\Unite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BonCommandeController extends Controller
{
    public function index()
    {
        $bcs = BonCommande::with('exercice', 'libelle', 'statutBC', 'naturePrestation')->get();
        return Inertia::render('BonCommande/Index', ['bons_commande' => $bcs]);
    }

    public function create()
    {
        return Inertia::render('BonCommande/Create', [
            'exercices'          => Exercice::all(),
            'libelles'           => Libelle::all(),
            'natures_prestation' => NaturePrestation::all(),
            'statuts_bc'         => StatutBC::orderBy('ordre')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'reference_bc'   => 'required|string|max:50|unique:bons_commande,reference_bc',
            'objet'          => 'required|string',
            'id_exercice'    => 'required|integer',
            'code_libelle'   => 'required|string',
            'code_nat_prest' => 'required|string',
            'id_statut_bc'   => 'required|integer',
        ]);

        BonCommande::create([
            'reference_bc'       => $request->reference_bc,
            'objet'              => $request->objet,
            'id_exercice'        => $request->id_exercice,
            'code_libelle'       => $request->code_libelle,
            'code_nat_prest'     => $request->code_nat_prest,
            'id_statut_bc'       => $request->id_statut_bc,
            'tva_applicable'     => $request->tva_applicable,
            'retenue_applicable' => $request->retenue_applicable,
            'date_creation'      => $request->date_creation,
            'date_mise_en_ligne' => $request->date_mise_en_ligne,
            'date_limite_devis'  => $request->date_limite_devis,
            'observations'       => $request->observations,
            'montant_estimatif'  => 0, // sera calculé après les désignations
        ]);

        return redirect()->route('bons-commande.index')->with('success', 'Bon de commande créé — ajoutez maintenant les désignations.');
    }

    public function show($reference)
    {
        $bc = BonCommande::with(
            'exercice', 'libelle', 'statutBC', 'naturePrestation',
            'designations.unite', 'devis.fournisseur', 'fournisseurs'
        )->findOrFail($reference);

        $unites = Unite::all();

        return Inertia::render('BonCommande/Show', [
            'bon_commande' => $bc,
            'unites'       => $unites,
        ]);
    }

    public function edit($reference)
    {
        return Inertia::render('BonCommande/Edit', [
            'bon_commande'       => BonCommande::with('statutBC')->findOrFail($reference),
            'exercices'          => Exercice::all(),
            'libelles'           => Libelle::all(),
            'natures_prestation' => NaturePrestation::all(),
            'statuts_bc'         => StatutBC::orderBy('ordre')->get(),
        ]);
    }

    public function update(Request $request, $reference)
    {
        $bc = BonCommande::findOrFail($reference);
        $request->validate([
            'objet'        => 'required|string',
            'id_statut_bc' => 'required|integer',
        ]);
        $bc->update($request->all());
        return redirect()->route('bons-commande.index')->with('success', 'Bon de commande mis à jour.');
    }

    public function changerStatut(Request $request, $reference)
    {
        BonCommande::findOrFail($reference)->update(['id_statut_bc' => $request->id_statut_bc]);
        return redirect()->back()->with('success', 'Statut mis à jour.');
    }

    public function destroy($reference)
{
    $bc = BonCommande::findOrFail($reference);
    // Supprimer les désignations d'abord
    $bc->designations()->delete();
    // Supprimer les devis
    $bc->devis()->delete();
    // Maintenant supprimer le BC
    $bc->delete();
        return redirect()->route('bons-commande.index')->with('success', 'Bon de commande supprimé.');
    }
}
