import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Show({ exercice }) {

    const total = exercice.types_montant.reduce(
        (sum, item) => sum + Number(item.montant),
        0
    );

    return (
        <AppLayout title={`Exercice ${exercice.annee}`}>

            <div className="bg-white rounded-xl shadow p-6 max-w-3xl">

                <h2 className="text-2xl font-bold mb-6">
                    Exercice {exercice.annee}
                </h2>

                <div className="space-y-3 mb-8">

                    <div>
                        <span className="font-semibold">
                            Année :
                        </span>{' '}
                        {exercice.annee}
                    </div>

                    <div>
                        <span className="font-semibold">
                            Date de visée :
                        </span>{' '}
                        {exercice.date_visee || '-'}
                    </div>

                    <div>
                        <span className="font-semibold">
                            Statut :
                        </span>{' '}
                        {exercice.statut?.nom_fr}
                    </div>

                    <div>
                        <span className="font-semibold">
                            Observations :
                        </span>{' '}
                        {exercice.observations || '-'}
                    </div>

                </div>

                <h3 className="text-lg font-semibold mb-4">
                    Types de montant
                </h3>

                <table className="w-full border mb-6">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="text-left p-3">
                                Type
                            </th>

                            <th className="text-right p-3">
                                Montant
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {exercice.types_montant.map((item) => (

                            <tr
                                key={item.id}
                                className="border-t"
                            >

                                <td className="p-3">
                                    {item.type_mt.libelle}
                                </td>

                                <td className="p-3 text-right">
                                    {Number(item.montant).toLocaleString()} DH
                                </td>

                            </tr>

                        ))}

                        <tr className="border-t bg-gray-50 font-bold">

                            <td className="p-3">
                                Montant Global
                            </td>

                            <td className="p-3 text-right">
                                {Number(total).toLocaleString()} DH
                            </td>

                        </tr>

                    </tbody>

                </table>

                <Link
                    href="/exercices"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                    Retour
                </Link>

            </div>

        </AppLayout>
    );
}