import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

export default function MaxNatureIndex({
    exercices = [],
    id_exercice = '',
    maxNatures = [],
}) {
    const handleExerciceChange = (e) => {
        const value = e.target.value;

        router.get(
            '/max-nature',
            {
                id_exercice: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const formatMontant = (montant) => {
        return (
            Number(montant || 0).toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }) + ' MAD'
        );
    };

    return (
        <AppLayout title="Max Nature">

            <div className="bg-white rounded-xl shadow p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Max Nature
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Montants maximum par nature de prestation
                        </p>
                    </div>

                    {/* زر الإضافة اللي كان موجود عندك أصلاً */}
                    <Link
                        href="/max-nature/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Ajouter une max nature
                    </Link>

                </div>


                {/* Exercice */}
                <div className="flex items-center gap-3 mb-6">

                    <label className="text-sm font-medium text-gray-700">
                        Exercice
                    </label>

                    <select
                        value={id_exercice || ''}
                        onChange={handleExerciceChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    >
                        <option value="">
                            -- Choisir --
                        </option>

                        {exercices.map((exercice) => (
                            <option
                                key={exercice.id_exercice}
                                value={exercice.id_exercice}
                            >
                                {exercice.annee}
                            </option>
                        ))}

                    </select>

                </div>


                {/* Listing */}
                {id_exercice ? (

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm border-collapse">

                            <thead>

                                <tr className="bg-gray-50 text-gray-600">

                                    <th className="text-left p-3 border-b">
                                        Code
                                    </th>

                                    <th className="text-left p-3 border-b">
                                        Nature de prestation
                                    </th>

                                    <th className="text-right p-3 border-b">
                                        Montant maximum
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {maxNatures.length > 0 ? (

                                    maxNatures.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-3 font-mono text-blue-600">
                                                {item.code_nat_prest}
                                            </td>

                                            <td className="p-3">
                                                {item.nature_prestation?.intitule_fr || '-'}
                                            </td>

                                            <td className="p-3 text-right font-medium">
                                                {formatMontant(
                                                    item.montant_max
                                                )}
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="p-6 text-center text-gray-400"
                                        >
                                            Aucun montant maximum enregistré
                                            pour cet exercice.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="p-10 text-center text-gray-400">
                        Veuillez sélectionner un exercice.
                    </div>

                )}

            </div>

        </AppLayout>
    );
}