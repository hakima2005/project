import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

function formatMontant(v) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(v || 0);
}

export default function MaxNatureIndex({ exercices, id_exercice, lignes }) {

    const [montants, setMontants] = useState(
        Object.fromEntries(
            lignes.map((l) => [l.code_nat_prest, l.montant_max ?? 0])
        )
    );

    const [saving, setSaving] = useState(false);

    const handleExerciceChange = (e) => {
        router.get(
            '/max-nature',
            { id_exercice: e.target.value },
            { preserveState: false }
        );
    };

    const handleMontantChange = (code, value) => {
        setMontants({
            ...montants,
            [code]: Number(value)
        });
    };

    const handleSave = () => {
        setSaving(true);

        const payload = {
            id_exercice: id_exercice,
            montants: Object.entries(montants).map(([code_nat_prest, montant_max]) => ({
                code_nat_prest,
                montant_max: Number(montant_max),
            })),
        };

        router.post('/max-nature', payload, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    return (
        <AppLayout title="Max Nature">
            <div className="space-y-6">

                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">
                            Montants max par nature de prestation
                        </h3>

                        <div>
                            <label className="mr-2">Exercice</label>
                            <select
                                value={id_exercice || ''}
                                onChange={handleExerciceChange}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="">-- Choisir --</option>
                                {exercices.map((ex) => (
                                    <option key={ex.id_exercice} value={ex.id_exercice}>
                                        {ex.annee}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">Code</th>
                                <th className="p-3 text-left">Nature de prestation</th>
                                <th className="p-3 text-right">Montant max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lignes.length > 0 ? (
                                lignes.map((l) => (
                                    <tr key={l.code_nat_prest} className="border-t">
                                        <td className="p-3 font-mono text-blue-600">{l.code_nat_prest}</td>
                                        <td className="p-3">{l.intitule_fr}</td>
                                        <td className="p-3 text-right">
                                            <input
                                                type="number"
                                                min="0"
                                                value={montants[l.code_nat_prest] ?? ''}
                                                onChange={(e) =>
                                                    handleMontantChange(l.code_nat_prest, e.target.value)
                                                }
                                                className="border rounded px-3 py-2 w-32 text-right"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-6 text-center text-gray-400">
                                        Aucune nature de prestation
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-5 text-right">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                        >
                            {saving ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}