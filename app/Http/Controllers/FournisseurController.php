<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FournisseurController extends Controller
{
    public function index()
    {
        $fournisseurs = Fournisseur::with('adresse', 'statut')->get();
        return Inertia::render('Fournisseur/Index', [
            'fournisseurs' => $fournisseurs
        ]);
    }

    public function create()
    {
        return Inertia::render('Fournisseur/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'raison_sociale' => 'required|string|max:200',
            'ICE'            => 'nullable|string|max:15|unique:fournisseurs,ICE',
            'email'          => 'nullable|email|max:100',
        ]);

        Fournisseur::create($request->all());
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur créé avec succès.');
    }

    public function show($id)
    {
        $fournisseur = Fournisseur::with('adresse', 'devis', 'bonCommandes')->findOrFail($id);
        return Inertia::render('Fournisseur/Show', [
            'fournisseur' => $fournisseur
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Fournisseur/Edit', [
            'fournisseur' => Fournisseur::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $fournisseur = Fournisseur::findOrFail($id);
        $request->validate([
            'raison_sociale' => 'required|string|max:200',
            'email'          => 'nullable|email|max:100',
        ]);

        $fournisseur->update($request->all());
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur mis à jour.');
    }

    public function destroy($id)
    {
        Fournisseur::findOrFail($id)->delete();
        return redirect()->route('fournisseurs.index')->with('success', 'Fournisseur supprimé.');
    }
}
