import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function NaturePrestationIndex({ natures }) {
    console.log(natures);

    return (
        <AppLayout title="Natures de prestation">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">
                        Liste des natures de prestation
                    </h3>

                    <Link
                        href="/natures-prestation/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Nouvelle nature
                    </Link>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Code</th>
                            <th className="text-left p-3">Intitulé FR</th>
                            <th className="text-left p-3">Type de catégorie</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {natures?.length > 0 ? (
                            natures.map((n) => (
                                <tr
                                    key={n.code_nat_prest}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="p-3 font-mono text-blue-600">
                                        {n.code_nat_prest}
                                    </td>

                                    <td className="p-3">
                                        {n.intitule_fr}
                                    </td>

                                    <td className="p-3">
                                        {n.typeCategorie?.libelle || 'N/A'}
                                    </td>

                                    <td className="p-3">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                            {n.statut?.nom_fr || 'N/A'}
                                        </span>
                                    </td>

                                    <td className="p-3 flex gap-2">
                                        <Link
                                            href={`/natures-prestation/${n.code_nat_prest}/edit`}
                                            className="text-orange-600 hover:underline"
                                        >
                                            Modifier
                                        </Link>

                                        <Link
                                            href={`/natures-prestation/${n.code_nat_prest}`}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm('Supprimer ?'))
                                                    e.preventDefault();
                                            }}
                                        >
                                            Supprimer
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-center text-gray-400">
                                    Aucune nature de prestation
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}