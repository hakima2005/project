<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use App\Models\BonCommande;
use Illuminate\Http\Request;

class DesignationController extends Controller
{
    public function store(Request $request)
    {
        // BC
        $bc = BonCommande::with('statutBC')->findOrFail($request->reference_bc);

        // Vérifier si le BC est attribué
        $estAttribue = strtolower($bc->statutBC->nom_fr ?? '') === 'attribué';

        // Validation
        $request->validate([
            'reference_bc'     => 'required|string|exists:bons_commande,reference_bc',
            'designation'      => 'required|string',
            'quantite'         => 'required|numeric|min:0',
            'id_unite'         => 'nullable|integer',
            'tva'              => 'nullable|numeric|min:0',
            'garanti'          => 'nullable|boolean',
            'prix_unitaire_ht' => $estAttribue
                ? 'required|numeric|min:0'
                : 'nullable|numeric|min:0',
        ]);

        // Calculs
        $tva = $request->tva ?? 0;

        if ($estAttribue) {

            $montant_ht  = $request->quantite * $request->prix_unitaire_ht;
            $montant_tva = $montant_ht * ($tva / 100);
            $montant_ttc = $montant_ht + $montant_tva;

        } else {

            $montant_ht  = 0;
            $montant_tva = 0;
            $montant_ttc = 0;

        }

        // Numéro d'ordre
        $num_ordre = Designation::where('reference_bc', $request->reference_bc)
            ->max('num_ordre') + 1;

        // Création
        Designation::create([
            'reference_bc'     => $request->reference_bc,
            'num_ordre'        => $num_ordre,
            'designation'      => $request->designation,
            'id_unite'         => $request->id_unite,
            'quantite'         => $request->quantite,
            'prix_unitaire_ht' => $estAttribue ? $request->prix_unitaire_ht : null,
            'montant_ht'       => $montant_ht,
            'tva'              => $tva,
            'montant_ttc'      => $montant_ttc,
            'observation'      => $request->observation,
            'garanti'          => $request->boolean('garanti'),
        ]);

        // Recalculer les totaux du BC
        $this->recalculerBC($request->reference_bc);

        return redirect()->back()->with('success', 'Désignation ajoutée.');
    }

    public function edit($id)
    {
        return inertia('Designation/Edit', [
            'designation' => Designation::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $designation = Designation::findOrFail($id);

        $request->validate([
            'designation'      => 'required|string',
            'quantite'         => 'required|numeric|min:0',
            'prix_unitaire_ht' => 'required|numeric|min:0',
            'tva'              => 'required|numeric|min:0',
            'garanti'          => 'nullable|boolean',
            'observation'      => 'nullable|string',
        ]);

        $montant_ht = $request->quantite * $request->prix_unitaire_ht;
        $montant_tva = $montant_ht * ($request->tva / 100);
        $montant_ttc = $montant_ht + $montant_tva;

        $designation->update([
            'designation'      => $request->designation,
            'quantite'         => $request->quantite,
            'prix_unitaire_ht' => $request->prix_unitaire_ht,
            'tva'              => $request->tva,
            'montant_ht'       => $montant_ht,
            'montant_ttc'      => $montant_ttc,
            'observation'      => $request->observation,
            'garanti'          => $request->boolean('garanti'),
        ]);

        $this->recalculerBC($designation->reference_bc);

        return redirect()
            ->route('bons-commande.show', $designation->reference_bc)
            ->with('success', 'Désignation modifiée.');
    }

    public function destroy($id)
    {
        $designation = Designation::findOrFail($id);

        $reference_bc = $designation->reference_bc;

        $designation->delete();

        $this->recalculerBC($reference_bc);

        return redirect()->back()->with('success', 'Désignation supprimée.');
    }

    private function recalculerBC($reference_bc)
    {
        $bc = BonCommande::findOrFail($reference_bc);

        $designations = Designation::where('reference_bc', $reference_bc)->get();

        $total_ht = $designations->sum('montant_ht');

        $total_tva = $designations->sum(function ($d) {
            return $d->montant_ht * ($d->tva / 100);
        });

        $total_ttc = $designations->sum('montant_ttc');

        $bc->update([
            'montant_ht'         => $total_ht,
            'montant_tva'        => $total_tva,
            'montant_estimatif'  => $total_ttc,
        ]);
    }
}