<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use App\Models\BonCommande;
use App\Models\Libelle;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DevisController extends Controller
{
    public function index()
    {
        $devis = Devis::with('fournisseur', 'bonCommande', 'statut')->get();
        return Inertia::render('Devis/Index', [
            'devis' => $devis
        ]);
    }

    public function create()
    {
        return Inertia::render('Devis/Create', [
            'bons_commande' => BonCommande::all(),
            'fournisseurs'  => Fournisseur::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'reference_bc'   => 'required|string|exists:bons_commande,reference_bc',
            'id_fournisseur' => 'required|integer|exists:fournisseurs,id_fournisseur',
            'montant_ht'     => 'required|numeric|min:0',
        ]);

        Devis::create($request->all());
        return redirect()->route('devis.index')->with('success', 'Devis créé avec succès.');
    }

    public function show($id)
    {
        $devis = Devis::with('fournisseur', 'bonCommande', 'statut')->findOrFail($id);
        return Inertia::render('Devis/Show', [
            'devis' => $devis
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Devis/Edit', [
            'devis'         => Devis::findOrFail($id),
            'bons_commande' => BonCommande::all(),
            'fournisseurs'  => Fournisseur::all(),
        ]);
    }

    public function update(Request $request, $id)
{
    $devis = Devis::findOrFail($id);

    $request->validate([
        'reference_bc'   => 'required|string|exists:bons_commande,reference_bc',
        'id_fournisseur' => 'required|integer|exists:fournisseurs,id_fournisseur',
        'reference_devis'=> 'required|string|max:100',
        'date_devis'     => 'required|date',
        'montant_ht'     => 'required|numeric|min:0',
        'montant_tva'    => 'nullable|numeric|min:0',
        'montant_ttc'    => 'required|numeric|min:0',
        'observation'    => 'nullable|string',
    ]);

    $devis->update([
        'reference_bc'   => $request->reference_bc,
        'id_fournisseur' => $request->id_fournisseur,
        'reference_devis'=> $request->reference_devis,
        'date_devis'     => $request->date_devis,
        'montant_ht'     => $request->montant_ht,
        'montant_tva'    => $request->montant_tva,
        'montant_ttc'    => $request->montant_ttc,
        'observation'    => $request->observation,
    ]);

    return redirect()
        ->route('devis.index')
        ->with('success', 'Devis mis à jour avec succès.');
}

   public function retenir($id)
{
    $devis = Devis::findOrFail($id);

    // رفض جميع العروض الأخرى لنفس BC
    Devis::where('reference_bc', $devis->reference_bc)
        ->where('id_devis', '!=', $id)
        ->update([
            'id_statut' => 3 // Rejeté
        ]);

    // اعتماد هذا العرض
    $devis->update([
        'id_statut' => 2 // Retenu
    ]);

    // تغيير حالة Bon de commande إلى "Attribué"
    BonCommande::where('reference_bc', $devis->reference_bc)
        ->update([
            'id_statut_bc' => 6
        ]);

    return redirect()->back()->with('success', 'Devis retenu avec succès.');
}

    public function destroy($id)
    {
        Devis::findOrFail($id)->delete();
        return redirect()->route('devis.index')->with('success', 'Devis supprimé avec succès.');
    }
}
