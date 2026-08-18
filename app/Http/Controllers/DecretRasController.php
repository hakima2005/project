<?php

namespace App\Http\Controllers;

use App\Models\DecretRas;
use App\Models\NaturePrestation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DecretRasController extends Controller
{
    public function index()
    {
        return Inertia::render('DecretRas/Index', [
            'decrets' => DecretRas::with('naturePrestation')->orderByDesc('date')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('DecretRas/Create', [
            'natures' => NaturePrestation::orderBy('intitule_fr')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date'    => 'required|date',
            'taux'    => 'required|array',
            'taux.*'  => 'nullable|numeric|min:0|max:100',
        ]);

        $created = 0;

        foreach ($validated['taux'] as $codeNatPrest => $taux) {

            if ($taux === null || $taux === '') {
                continue;
            }

            DecretRas::create([
                'date'           => $validated['date'],
                'code_nat_prest' => $codeNatPrest,
                'taux'           => $taux,
            ]);

            $created++;
        }

        return redirect()->route('decret-ras.index')
            ->with('success', "{$created} décret(s) RAS ajouté(s) avec succès.");
    }

    public function edit($id)
    {
        return Inertia::render('DecretRas/Edit', [
            'decret'  => DecretRas::findOrFail($id),
            'natures' => NaturePrestation::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $decret = DecretRas::findOrFail($id);

        $request->validate([
            'date'            => 'required|date',
            'code_nat_prest'  => 'required|string|exists:nature_prestations,code_nat_prest',
            'taux'            => 'required|numeric|min:0|max:100',
        ]);

        $decret->update($request->all());

        return redirect()->route('decret-ras.index')
            ->with('success', 'Décret RAS mis à jour.');
    }

    public function destroy($id)
    {
        DecretRas::findOrFail($id)->delete();

        return redirect()->route('decret-ras.index')
            ->with('success', 'Décret RAS supprimé.');
    }
}