import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';


export default function DevisIndex({
    devis = [],
}) {

    /**
     * =========================================================
     * RETENIR DEVIS
     * =========================================================
     */
    const retenir = (id) => {

        if (
            confirm(
                'Retenir ce devis et rejeter les autres devis du même BC ?'
            )
        ) {

            router.post(
                `/devis/${id}/retenir`
            );
        }
    };


    /**
     * =========================================================
     * FORMAT MONTANT
     * =========================================================
     */
    const formatMontant = (montant) => {

        return Number(
            montant || 0
        ).toLocaleString(
            'fr-FR',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );
    };


    return (

        <AppLayout title="Devis">

            <div className="bg-white rounded-xl shadow p-6">

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div className="flex items-center justify-between mb-6">

                    <h3 className="text-md font-semibold text-gray-700">
                        Liste des devis
                    </h3>


                    <div className="flex gap-3">

                        <Link
                            href={route('devis.import')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                        >
                            + Importer un document
                        </Link>

                        <Link
                            href={route('devis.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            + Nouveau devis
                        </Link>

                    </div>

                </div>


                {/* =====================================================
                    TABLE
                ====================================================== */}

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="bg-gray-50 text-gray-600">

                                <th className="text-left p-3">
                                    Référence
                                </th>

                                <th className="text-left p-3">
                                    BC
                                </th>

                                <th className="text-left p-3">
                                    Fournisseur
                                </th>

                                <th className="text-left p-3">
                                    HT
                                </th>

                                <th className="text-left p-3">
                                    TVA
                                </th>

                                <th className="text-left p-3">
                                    RAS
                                </th>

                                <th className="text-left p-3">
                                    TTC
                                </th>

                                <th className="text-left p-3">
                                    Date
                                </th>

                                <th className="text-left p-3">
                                    Statut
                                </th>

                                <th className="text-left p-3">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {devis.length > 0 ? (

                                devis.map((d) => (

                                    <tr
                                        key={d.id_devis}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        {/* Référence */}

                                        <td className="p-3 font-mono">
                                            {d.reference_devis}
                                        </td>


                                        {/* BC */}

                                        <td className="p-3 text-blue-600">
                                            {d.reference_bc}
                                        </td>


                                        {/* Fournisseur */}

                                        <td className="p-3">
                                            {d.fournisseur?.raison_sociale ||
                                                '—'}
                                        </td>


                                        {/* HT */}

                                        <td className="p-3">
                                            {formatMontant(
                                                d.montant_ht
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* TVA */}

                                        <td className="p-3 text-blue-600">
                                            {formatMontant(
                                                d.montant_tva
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* RAS */}

                                        <td className="p-3 text-orange-600">
                                            {formatMontant(
                                                d.montant_retenue
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* TTC */}

                                        <td className="p-3 font-semibold">
                                            {formatMontant(
                                                d.montant_ttc
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* Date */}

                                        <td className="p-3">
                                            {d.date_devis}
                                        </td>


                                        {/* Statut */}

                                        <td className="p-3">

                                            <span
                                                className={`
                                                    px-2
                                                    py-1
                                                    rounded
                                                    text-xs
                                                    ${d.statut?.nom_fr ===
                                                        'retenu'
                                                        ? 'bg-green-100 text-green-700'
                                                        : d.statut?.nom_fr ===
                                                            'rejeté'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }
                                                `}
                                            >
                                                {d.statut?.nom_fr ||
                                                    'reçu'}
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="p-3">

                                            <div className="flex gap-3 whitespace-nowrap">

                                                {/* Modifier */}

                                                <Link
                                                    href={route(
                                                        'devis.edit',
                                                        d.id_devis
                                                    )}
                                                    className="text-orange-600 hover:underline"
                                                >
                                                    Modifier
                                                </Link>


                                                {/* Retenir */}

                                                {d.statut?.nom_fr !==
                                                    'retenu' && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                retenir(
                                                                    d.id_devis
                                                                )
                                                            }
                                                            className="text-green-600 hover:underline"
                                                        >
                                                            Retenir
                                                        </button>

                                                    )}


                                                {/* Supprimer */}

                                                <Link
                                                    href={route(
                                                        'devis.destroy',
                                                        d.id_devis
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:underline"
                                                    onClick={(e) => {

                                                        if (
                                                            !confirm(
                                                                'Supprimer ce devis ?'
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
                                        colSpan="10"
                                        className="p-6 text-center text-gray-400"
                                    >
                                        Aucun devis
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