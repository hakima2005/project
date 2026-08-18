<?php

namespace App\Http\Controllers;

use App\Models\NaturePrestation;
use App\Models\TypeCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NaturePrestationController extends Controller
{
    public function index()
    {
        $natures = NaturePrestation::with([
            'statut',
            'typeCategorie',
        ])
        ->orderBy('code_nat_prest')
        ->get();

        return Inertia::render('NaturePrestation/Index', [
            'natures' => $natures,
        ]);
    }

    public function create()
    {
        $typesCategories = TypeCategorie::where('id_statut', 1)
            ->orderBy('id_type_categorie')
            ->get([
                'id_type_categorie',
                'libelle',
            ]);

        return Inertia::render('NaturePrestation/Create', [
            'typesCategories' => $typesCategories,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'code_nat_prest' => [
            'required',
            'string',
            'max:20',
            'unique:nature_prestations,code_nat_prest',
        ],

        'intitule_fr' => [
            'required',
            'string',
            'max:100',
        ],

        'intitule_ar' => [
            'nullable',
            'string',
            'max:100',
        ],

        'description' => [
            'nullable',
            'string',
        ],

        'id_type_categorie' => [
            'required',
            'exists:type_categories,id_type_categorie',
        ],
    ]);

    // Statut par défaut = Reçu
    $statutRecu = \App\Models\Statut::where('nom_fr', 'Reçu')->first();

    if (!$statutRecu) {
        return back()->withErrors([
            'id_statut' => 'Le statut "Reçu" n’existe pas dans la table des statuts.',
        ]);
    }

    $validated['id_statut'] = $statutRecu->id_statut;

    NaturePrestation::create($validated);

    return redirect()
        ->route('natures-prestation.index')
        ->with(
            'success',
            'Nature de prestation créée avec succès.'
        );
}

    public function edit($code)
    {
        $nature = NaturePrestation::findOrFail($code);

        $typesCategories = TypeCategorie::where('id_statut', 1)
            ->orderBy('id_type_categorie')
            ->get([
                'id_type_categorie',
                'libelle',
            ]);

        return Inertia::render('NaturePrestation/Edit', [
            'nature' => $nature,
            'typesCategories' => $typesCategories,
        ]);
    }

    public function update(Request $request, $code)
    {
        $nature = NaturePrestation::findOrFail($code);

        $validated = $request->validate([
            'intitule_fr' => [
                'required',
                'string',
                'max:100',
            ],

            'intitule_ar' => [
                'nullable',
                'string',
                'max:100',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'id_type_categorie' => [
                'required',
                'exists:type_categories,id_type_categorie',
            ],
        ]);

        $nature->update($validated);

        return redirect()
            ->route('natures-prestation.index')
            ->with(
                'success',
                'Nature de prestation modifiée avec succès.'
            );
    }

    public function destroy($code)
    {
        $nature = NaturePrestation::findOrFail($code);

        $nature->delete();

        return redirect()
            ->route('natures-prestation.index')
            ->with(
                'success',
                'Nature de prestation supprimée.'
            );
    }
}