<?php

namespace App\Http\Controllers;

use App\Models\Nature;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NatureController extends Controller
{
    public function index()
    {
        $natures = Nature::with('categorie', 'statut')->get();
        return Inertia::render('Nature/Index', [
            'natures' => $natures
        ]);
    }

    public function create()
    {
        return Inertia::render('Nature/Create', [
            'categories' => Categorie::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code_nature'    => 'required|string|max:20|unique:natures,code_nature',
            'nom_fr'         => 'required|string|max:100',
            'code_categorie' => 'required|string|exists:categories,code_categorie',
        ]);

        Nature::create($request->all());
        return redirect()->route('natures.index')->with('success', 'Nature créée avec succès.');
    }

    public function show($code)
    {
        $nature = Nature::with('libelles', 'categorie')->findOrFail($code);
        return Inertia::render('Nature/Show', [
            'nature' => $nature
        ]);
    }

    public function edit($code)
    {
        return Inertia::render('Nature/Edit', [
            'nature'     => Nature::findOrFail($code),
            'categories' => Categorie::all(),
        ]);
    }

    public function update(Request $request, $code)
    {
        $nature = Nature::findOrFail($code);
        $request->validate([
            'nom_fr' => 'required|string|max:100',
        ]);

        $nature->update($request->all());
        return redirect()->route('natures.index')->with('success', 'Nature mise à jour.');
    }

    public function destroy($code)
    {
        Nature::findOrFail($code)->delete();
        return redirect()->route('natures.index')->with('success', 'Nature supprimée.');
    }
}
