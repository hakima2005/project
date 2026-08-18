import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function NaturePrestationIndex({ natures = [] }) {
    return (
        <AppLayout title="Natures de prestation">

            <div className="bg-white rounded-xl shadow p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Natures de prestation
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Liste des natures de prestation
                        </p>
                    </div>

                    <Link
                        href="/natures-prestation/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Nouvelle nature
                    </Link>

                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="bg-gray-50 text-gray-600">

                                <th className="text-left p-3 border-b">
                                    Code
                                </th>

                                <th className="text-left p-3 border-b">
                                    Intitulé FR
                                </th>

                                <th className="text-left p-3 border-b">
                                    Type de catégorie
                                </th>

                                <th className="text-left p-3 border-b">
                                    Statut
                                </th>

                                <th className="text-left p-3 border-b">
                                    Actions
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {natures.length > 0 ? (

                                natures.map((nature) => (

                                    <tr
                                        key={nature.code_nat_prest}
                                        className="border-b hover:bg-gray-50"
                                    >

                                        {/* Code */}
                                        <td className="p-3 font-mono text-blue-600">
                                            {nature.code_nat_prest}
                                        </td>

                                        {/* Intitulé */}
                                        <td className="p-3">
                                            {nature.intitule_fr}
                                        </td>

                                        {/* Type catégorie */}
                                        <td className="p-3">

                                            {nature.type_categorie?.libelle
                                                ? nature.type_categorie.libelle
                                                : 'Type non défini'}

                                        </td>

                                        {/* Statut */}
                                        <td className="p-3">

                                            {nature.statut?.nom_fr ? (

                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                                    {nature.statut.nom_fr}
                                                </span>

                                            ) : (

                                                <span className="text-gray-400">
                                                    N/A
                                                </span>

                                            )}

                                        </td>

                                        {/* Actions */}
                                        <td className="p-3">

                                            <div className="flex gap-3">

                                                <Link
                                                    href={`/natures-prestation/${nature.code_nat_prest}/edit`}
                                                    className="text-orange-600 hover:underline"
                                                >
                                                    Modifier
                                                </Link>

                                                <Link
                                                    href={`/natures-prestation/${nature.code_nat_prest}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:underline"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                'Voulez-vous vraiment supprimer cette nature de prestation ?'
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Supprimer
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-6 text-center text-gray-400"
                                    >
                                        Aucune nature de prestation
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AppLayout>
    );
}