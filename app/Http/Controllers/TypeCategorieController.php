<?php

namespace App\Http\Controllers;

use App\Models\TypeCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeCategorieController extends Controller
{
    public function index()
    {
        return Inertia::render('TypeCategorie/Index', [
            'typesCategories' => TypeCategorie::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('TypeCategorie/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
        ]);

        TypeCategorie::create([
            'libelle' => $request->libelle,
            'id_statut' => 1,
        ]);

        return redirect()->route('type-categories.index')
            ->with('success', 'Type ajouté avec succès.');
    }

    public function edit($id)
    {
        return Inertia::render('TypeCategorie/Edit', [
            'typeCategorie' => TypeCategorie::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'id_statut' => 'required|integer',
        ]);

        $type = TypeCategorie::findOrFail($id);

        $type->update([
            'libelle' => $request->libelle,
            'id_statut' => $request->id_statut,
        ]);

        return redirect()->route('type-categories.index')
            ->with('success', 'Type modifié.');
    }

    public function destroy($id)
    {
        TypeCategorie::findOrFail($id)->delete();

        return redirect()->route('type-categories.index');
    }
}