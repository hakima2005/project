<?php

namespace App\Http\Controllers;

use App\Models\Libelle;
use App\Models\NaturePrestation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibelleController extends Controller
{
    public function index()
    {
        $libelles = Libelle::with('naturePrestation', 'statut')->get();

        return Inertia::render('Libelle/Index', [
            'libelles' => $libelles
        ]);
    }

    public function create()
    {
        return Inertia::render('Libelle/Create', [
            'naturesPrestation' => NaturePrestation::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code_libelle'   => 'required|string|max:20|unique:libelles,code_libelle',
            'intitule_fr'    => 'required|string|max:200',
            'code_nat_prest' => 'required|string|exists:nature_prestations,code_nat_prest',
            'budget_affecte' => 'required|numeric|min:0',
        ]);

        Libelle::create([
            'code_libelle'       => $request->code_libelle,
            'intitule_fr'        => $request->intitule_fr,
            'intitule_ar'        => $request->intitule_ar,
            'budget_affecte'     => $request->budget_affecte,
            'budget_engage'      => 0,
            'budget_consomme'    => 0,
            'budget_disponible'  => $request->budget_affecte,
            'id_statut'          => 1,
            'code_nat_prest'     => $request->code_nat_prest,
        ]);

        return redirect()->route('libelles.index')
            ->with('success', 'Libellé créé avec succès.');
    }

    public function show($code)
    {
        $libelle = Libelle::with('naturePrestation', 'bonCommandes')->findOrFail($code);

        return Inertia::render('Libelle/Show', [
            'libelle' => $libelle
        ]);
    }

    public function edit($code)
    {
        return Inertia::render('Libelle/Edit', [
            'libelle' => Libelle::findOrFail($code),
            'naturesPrestation' => NaturePrestation::all(),
        ]);
    }

    public function update(Request $request, $code)
    {
        $libelle = Libelle::findOrFail($code);

        $request->validate([
            'intitule_fr'    => 'required|string|max:200',
            'budget_affecte' => 'required|numeric|min:0',
            'code_nat_prest' => 'required|string|exists:nature_prestations,code_nat_prest',
        ]);

        $libelle->update([
            'intitule_fr'       => $request->intitule_fr,
            'intitule_ar'       => $request->intitule_ar,
            'budget_affecte'    => $request->budget_affecte,
            'budget_disponible' => $request->budget_affecte - $libelle->budget_engage,
            'code_nat_prest'    => $request->code_nat_prest,
        ]);

        return redirect()->route('libelles.index')
            ->with('success', 'Libellé mis à jour.');
    }

    public function destroy($code)
    {
        Libelle::findOrFail($code)->delete();

        return redirect()->route('libelles.index')
            ->with('success', 'Libellé supprimé.');
    }
}