<?php

namespace App\Http\Controllers;

use App\Models\Famille;
use App\Models\Exercice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilleController extends Controller
{
    public function index()
    {
        $familles = Famille::with('statut', 'exercice')->get();
        return Inertia::render('Famille/Index', [
            'familles' => $familles
        ]);
    }

    public function create()
    {
        $exercices = Exercice::all();
        return Inertia::render('Famille/Create', [
            'exercices' => $exercices
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code_famille' => 'required|string|max:20|unique:familles,code_famille',
            'nom_fr'       => 'required|string|max:100',
            'id_exercice'  => 'required|integer|exists:exercices,id_exercice',
        ]);

        Famille::create($request->all());
        return redirect()->route('familles.index')->with('success', 'Famille créée avec succès.');
    }

    public function show($code)
    {
        $famille = Famille::with('categories', 'exercice')->findOrFail($code);
        return Inertia::render('Famille/Show', [
            'famille' => $famille
        ]);
    }

    public function edit($code)
    {
        $famille   = Famille::findOrFail($code);
        $exercices = Exercice::all();
        return Inertia::render('Famille/Edit', [
            'famille'   => $famille,
            'exercices' => $exercices
        ]);
    }

    public function update(Request $request, $code)
    {
        $famille = Famille::findOrFail($code);
        $request->validate([
            'nom_fr' => 'required|string|max:100',
        ]);

        $famille->update($request->all());
        return redirect()->route('familles.index')->with('success', 'Famille mise à jour.');
    }

    public function destroy($code)
    {
        Famille::findOrFail($code)->delete();
        return redirect()->route('familles.index')->with('success', 'Famille supprimée.');
    }
}
