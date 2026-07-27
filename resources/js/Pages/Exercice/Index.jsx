import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function ExerciceIndex({ exercices }) {

    return (
        <AppLayout title="Exercices budgétaires">

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">
                        Liste des exercices
                    </h3>

                    <Link
                        href="/exercices/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Nouvel exercice
                    </Link>
                </div>

                <table className="w-full text-sm">

                    <thead>

                        <tr className="bg-gray-50 text-gray-600">

                            <th className="text-left p-3">Année</th>

                            <th className="text-left p-3">
                                Statut
                            </th>

                            <th className="text-left p-3">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {exercices.length > 0 ? (

                            exercices.map((ex) => {

                                return (

                                    <tr
                                        key={ex.id_exercice}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-3 font-bold">
                                            {ex.annee}
                                        </td>

                                        <td className="p-3">

                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                {ex.statut?.nom_fr}
                                            </span>

                                        </td>

                                        <td className="p-3 flex gap-2">

                                            <Link
                                                href={`/exercices/${ex.id_exercice}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Voir
                                            </Link>

                                            <Link
                                                href={`/exercices/${ex.id_exercice}/edit`}
                                                className="text-orange-600 hover:underline"
                                            >
                                                Modifier
                                            </Link>

                                            <Link
                                                href={`/exercices/${ex.id_exercice}`}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:underline"
                                                onClick={(e) => {
                                                    if (!confirm('Supprimer cet exercice ?'))
                                                        e.preventDefault();
                                                }}
                                            >
                                                Supprimer
                                            </Link>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="p-6 text-center text-gray-400"
                                >
                                    Aucun exercice trouvé
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </AppLayout>
    );
}