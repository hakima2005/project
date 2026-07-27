<?php

namespace App\Http\Controllers;

use App\Models\NaturePrestation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TypeCategorie;

class NaturePrestationController extends Controller
{
    public function index()
    {
        return Inertia::render('NaturePrestation/Index', [
            'natures' => NaturePrestation::with('statut', 'typeCategorie')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('NaturePrestation/Create', [
            'typesCategories' => TypeCategorie::where('id_statut',1)->get(),
       ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code_nat_prest' => 'required|string|max:20|unique:nature_prestations,code_nat_prest',
            'intitule_fr'    => 'required|string|max:100',
            'id_type_categorie' => 'required|exists:type_categories,id_type_categorie',
   ]);

        NaturePrestation::create($request->all());

        return redirect()->route('natures-prestation.index')
            ->with('success', 'Nature de prestation créée avec succès.');
    }


    public function edit($code)
    {
        return Inertia::render('NaturePrestation/Edit', [
            'nature' => NaturePrestation::findOrFail($code),
            'typesCategories' => TypeCategorie::where('id_statut', 1)->get(),
      ]);
 }

    public function update(Request $request, $code)
    {
        $nature = NaturePrestation::findOrFail($code);

        $request->validate([
            'intitule_fr' => 'required|string|max:100',
            'id_type_categorie' => 'required|exists:type_categories,id_type_categorie',
  ]);

        $nature->update($request->all());

        return redirect()->route('natures-prestation.index')
            ->with('success', 'Nature de prestation modifiée.');
    }

    public function destroy($code)
    {
        NaturePrestation::findOrFail($code)->delete();

        return redirect()->route('natures-prestation.index')
            ->with('success', 'Nature de prestation supprimée.');
    }
}