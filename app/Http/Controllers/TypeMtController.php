<?php

namespace App\Http\Controllers;

use App\Models\TypeMt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeMtController extends Controller
{
    public function index()
    {
        return Inertia::render('TypeMt/Index', [
            'typesMt' => TypeMt::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('TypeMt/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
    'libelle' => 'required|string|max:255',
]);

TypeMt::create([
    'libelle' => $request->libelle,
    'actif' => true,
]);

        return redirect()->route('type-mts.index')
            ->with('success', 'Type ajouté avec succès.');
    }

    public function edit($id)
    {
        return Inertia::render('TypeMt/Edit', [
            'typeMt' => TypeMt::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
    'libelle' => 'required|string|max:255',
    'actif' => 'required|boolean',
]);

$type = TypeMt::findOrFail($id);

$type->update([
    'libelle' => $request->libelle,
    'actif' => $request->actif,
]);

        return redirect()->route('type-mts.index')
            ->with('success', 'Type modifié.');
    }

    public function destroy($id)
    {
        TypeMt::findOrFail($id)->delete();

        return redirect()->route('type-mts.index');
    }
}