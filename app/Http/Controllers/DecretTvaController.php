<?php

namespace App\Http\Controllers;

use App\Models\DecretTva;
use App\Models\NaturePrestation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DecretTvaController extends Controller
{
    public function index()
    {
        return Inertia::render('DecretTva/Index', [
            'decrets' => DecretTva::with('naturePrestation')->orderByDesc('date')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('DecretTva/Create', [
            'natures' => NaturePrestation::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date'            => 'required|date',
            'code_nat_prest'  => 'required|string|exists:nature_prestations,code_nat_prest',
            'taux'            => 'required|numeric|min:0|max:100',
        ]);

        DecretTva::create($request->all());

        return redirect()->route('decret-tva.index')
            ->with('success', 'Décret TVA ajouté avec succès.');
    }

    public function edit($id)
    {
        return Inertia::render('DecretTva/Edit', [
            'decret'  => DecretTva::findOrFail($id),
            'natures' => NaturePrestation::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $decret = DecretTva::findOrFail($id);

        $request->validate([
            'date'            => 'required|date',
            'code_nat_prest'  => 'required|string|exists:nature_prestations,code_nat_prest',
            'taux'            => 'required|numeric|min:0|max:100',
        ]);

        $decret->update($request->all());

        return redirect()->route('decret-tva.index')
            ->with('success', 'Décret TVA mis à jour.');
    }

    public function destroy($id)
    {
        DecretTva::findOrFail($id)->delete();

        return redirect()->route('decret-tva.index')
            ->with('success', 'Décret TVA supprimé.');
    }
}
