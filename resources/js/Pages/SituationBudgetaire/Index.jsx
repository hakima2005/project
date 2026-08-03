import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';

function formatMontant(v) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(v || 0);
}

export default function SituationBudgetaireIndex({
    exercices,
    id_exercice,
    lignes,
    montant_global,
}) {

    const [montants, setMontants] = useState(
        Object.fromEntries(
            lignes.map((l) => [
                l.id_type_mt,
                l.montant ?? 0,
            ])
        )
    );

    const [numerosCompte, setNumerosCompte] = useState(
        Object.fromEntries(
            lignes.map((l) => [
                l.id_type_mt,
                l.n_compte ?? '',
            ])
        )
    );

    const handleExerciceChange = (e) => {
        router.get(
            '/situation-budgetaire',
            { id_exercice: e.target.value },
            { preserveState: false }
        );
    };

    const handleMontantChange = (id, value) => {
        setMontants({
            ...montants,
            [id]: Number(value),
        });
    };

    const handleNumeroCompteChange = (id, value) => {
        setNumerosCompte({
            ...numerosCompte,
            [id]: value,
        });
    };

    const totalCategories = Object.values(montants).reduce(
        (a, b) => a + Number(b || 0),
        0
    );

    const resteAPayer = montant_global - totalCategories;

    const handleSave = () => {
        router.post('/situation-budgetaire', {
            id_exercice,
            lignes: lignes.map((l) => ({
                id_type_mt: l.id_type_mt,
                n_compte: numerosCompte[l.id_type_mt] ?? '',
                montant: montants[l.id_type_mt] ?? 0,
            })),
        }, {
            preserveScroll: true,
            onSuccess: () => {

                console.log('Enregistré avec succès');
            },
            onError: (errors) => {
                console.error('Erreur:', errors);
            },
        });
    };

    return (
        <AppLayout title="Situation budgétaire">

            <div className="space-y-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-center">

                        <h3 className="font-semibold text-gray-700">
                            Situation budgétaire
                        </h3>

                        <div>

                            <label className="mr-2">
                                Exercice
                            </label>

                            <select
                                value={id_exercice || ''}
                                onChange={handleExerciceChange}
                                className="border rounded-lg px-3 py-2"
                            >

                                <option value="">
                                    -- Choisir --
                                </option>

                                {exercices.map((ex) => (

                                    <option
                                        key={ex.id_exercice}
                                        value={ex.id_exercice}
                                    >
                                        {ex.annee}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">
                            Montant global
                        </p>

                        <p className="text-2xl font-bold text-blue-600">
                            {formatMontant(montant_global)}
                        </p>

                    </div>

                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">
                            Total catégories
                        </p>

                        <p className="text-2xl font-bold text-orange-600">
                            {formatMontant(totalCategories)}
                        </p>

                    </div>

                    <div className="bg-white shadow rounded-xl p-6">

                        <p className="text-gray-500">
                            Reste à payer
                        </p>

                        <p
                            className={`text-2xl font-bold ${resteAPayer < 0
                                    ? 'text-red-600'
                                    : 'text-green-600'
                                }`}
                        >
                            {formatMontant(resteAPayer)}
                        </p>

                    </div>

                </div>

                <div className="bg-white shadow rounded-xl p-6">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="bg-gray-50">
                                <th className="p-3 text-left">
                                    N° compte
                                </th>

                                <th className="p-3 text-left">
                                    Type catégorie
                                </th>

                                <th className="p-3 text-right">
                                    Montant
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {lignes.length > 0 ? (

                                lignes.map((l) => (

                                    <tr
                                        key={l.id_type_mt}
                                        className="border-t"
                                    >

                                        <td className="p-3">
                                            <input
                                                type="text"
                                                value={numerosCompte[l.id_type_mt] ?? ''}
                                                onChange={(e) =>
                                                    handleNumeroCompteChange(
                                                        l.id_type_mt,
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-3 py-2 w-32"
                                                placeholder="N° compte"
                                            />
                                        </td>

                                        <td className="p-3">
                                            {l.libelle}
                                        </td>

                                        <td className="p-3 text-right">

                                            <input
                                                type="number"
                                                min="0"
                                                value={
                                                    montants[l.id_type_mt] ?? ''
                                                }
                                                onChange={(e) =>
                                                    handleMontantChange(
                                                        l.id_type_mt,
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-3 py-2 w-36 text-right"
                                            />

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="p-6 text-center text-gray-400"
                                    >
                                        Aucun type de catégorie
                                    </td>

                                </tr>

                            )}

                        </tbody>

                        <tfoot>

                            <tr className="border-t bg-gray-50 font-semibold">

                                <td colSpan="2" className="p-3 text-right">
                                    Total
                                </td>

                                <td className="p-3 text-right">
                                    {formatMontant(totalCategories)}
                                </td>

                            </tr>

                        </tfoot>

                    </table>

                    <div className="mt-6 flex justify-end">

                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Enregistrer
                        </button>

                    </div>

                </div>

            </div>

        </AppLayout>
    );
}