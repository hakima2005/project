<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UtilisateurController extends Controller
{
    public function index()
    {
        $utilisateurs = Utilisateur::with('profil', 'statut')->get();
        return Inertia::render('Utilisateur/Index', [
            'utilisateurs' => $utilisateurs
        ]);
    }

    public function create()
    {
        return Inertia::render('Utilisateur/Create', [
            'profils' => Profil::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom'          => 'required|string|max:100',
            'login'        => 'required|string|max:50|unique:utilisateurs,login',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'id_profil'    => 'required|integer',
        ]);

        Utilisateur::create([
            ...$request->except('mot_de_passe'),
            'mot_de_passe' => Hash::make($request->mot_de_passe),
        ]);

        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur créé avec succès.');
    }

    public function show($id)
    {
        $utilisateur = Utilisateur::with('profil', 'statut')->findOrFail($id);
        return Inertia::render('Utilisateur/Show', [
            'utilisateur' => $utilisateur
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Utilisateur/Edit', [
            'utilisateur' => Utilisateur::findOrFail($id),
            'profils'     => Profil::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $request->validate([
            'nom'   => 'required|string|max:100',
            'login' => 'required|string|max:50|unique:utilisateurs,login,' . $id . ',id_utilisateur',
        ]);

        $data = $request->except('mot_de_passe');
        if ($request->filled('mot_de_passe')) {
            $data['mot_de_passe'] = Hash::make($request->mot_de_passe);
        }

        $utilisateur->update($data);
        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur mis à jour.');
    }

    public function destroy($id)
    {
        Utilisateur::findOrFail($id)->delete();
        return redirect()->route('utilisateurs.index')->with('success', 'Utilisateur supprimé.');
    }
}
