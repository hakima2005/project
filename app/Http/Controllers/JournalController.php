<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $query = Journal::with('utilisateur', 'typeAction');

        if ($request->has('id_utilisateur')) {
            $query->where('id_utilisateur', $request->id_utilisateur);
        }

        if ($request->has('date_debut') && $request->has('date_fin')) {
            $query->whereBetween('date_heure', [$request->date_debut, $request->date_fin]);
        }

        $journals = $query->orderBy('date_heure', 'desc')->paginate(50);

        return Inertia::render('Journal/Index', [
            'journals' => $journals
        ]);
    }

    public function create()
    {
        // Journal = automatique, pas de création manuelle
        return redirect()->route('journals.index');
    }

    public function store(Request $request)
    {
        // Appelé automatiquement par le système
        Journal::create([
            'id_utilisateur'  => auth()->id(),
            'id_action'       => $request->id_action,
            'ancienne_valeur' => json_encode($request->ancienne_valeur),
            'nouvelle_valeur' => json_encode($request->nouvelle_valeur),
            'adresse_ip'      => $request->ip(),
            'date_heure'      => now(),
        ]);
    }

    public function show($id)
    {
        $journal = Journal::with('utilisateur', 'typeAction')->findOrFail($id);
        return Inertia::render('Journal/Show', [
            'journal' => $journal
        ]);
    }

    public function edit($id)
    {
        // Journal = non modifiable
        return redirect()->route('journals.index');
    }

    public function update(Request $request, $id)
    {
        // Journal = non modifiable
        return redirect()->route('journals.index');
    }

    public function destroy($id)
    {
        // Journal = non supprimable
        return redirect()->route('journals.index')->withErrors([
            'error' => 'Le journal de traçabilité ne peut pas être supprimé.'
        ]);
    }
}
