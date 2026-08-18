import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';

export default function BonCommandeShow({ bon_commande, unites }) {

    // =========================================================
    // STATUT
    // =========================================================

    const statutActuel =
        bon_commande.statut_b_c?.nom_fr || 'Créé';

    // Attribué
    const estAttribue =
        statutActuel === 'Attribué';


    // =========================================================
    // TOTAUX BC
    // =========================================================

    const total_ht =
        bon_commande.designations?.reduce(
            (total, d) =>
                total + parseFloat(d.montant_ht || 0),
            0
        ) || 0;

    const total_tva =
        bon_commande.designations?.reduce(
            (total, d) =>
                total +
                parseFloat(d.montant_ht || 0) *
                    (parseFloat(d.tva || 0) / 100),
            0
        ) || 0;

    const total_ttc =
        bon_commande.designations?.reduce(
            (total, d) =>
                total + parseFloat(d.montant_ttc || 0),
            0
        ) || 0;


    // =========================================================
    // RETENIR DEVIS
    // =========================================================

    const retenir = (id) => {
        if (
            confirm(
                'Retenir ce devis et rejeter les autres ?'
            )
        ) {
            router.post(`/devis/${id}/retenir`);
        }
    };


    return (
        <AppLayout
            title={`BC — ${bon_commande.reference_bc}`}
        >

            <div className="space-y-6">

                {/* =====================================================
                    INFORMATIONS GENERALES
                ====================================================== */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex justify-between items-start mb-4">

                        <h3 className="text-md font-semibold text-gray-700">
                            Informations générales
                        </h3>

                        <span
                            className="px-3 py-1 rounded text-sm font-medium"
                            style={{
                                backgroundColor:
                                    (bon_commande.statut_b_c?.couleur ||
                                        '#6b7280') + '20',

                                color:
                                    bon_commande.statut_b_c?.couleur ||
                                    '#6b7280',
                            }}
                        >
                            {statutActuel}
                        </span>

                    </div>


                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <span className="text-gray-500">
                                Référence:
                            </span>

                            <span className="font-mono font-bold ml-2">
                                {bon_commande.reference_bc}
                            </span>
                        </div>


                        <div>
                            <span className="text-gray-500">
                                Exercice:
                            </span>

                            <span className="ml-2">
                                {bon_commande.exercice?.annee || '—'}
                            </span>
                        </div>


                        <div>
                            <span className="text-gray-500">
                                Objet:
                            </span>

                            <span className="ml-2">
                                {bon_commande.objet || '—'}
                            </span>
                        </div>


                        <div>
                            <span className="text-gray-500">
                                Nature prestation:
                            </span>

                            <span className="ml-2">
                                {bon_commande.nature_prestation?.intitule_fr ||
                                    '—'}
                            </span>
                        </div>


                        <div>
                            <span className="text-gray-500">
                                Date limite devis:
                            </span>

                            <span className="ml-2">
                                {bon_commande.date_limite_devis || '—'}
                            </span>
                        </div>


                        <div>
                            <span className="text-gray-500">
                                Nombre de devis reçus:
                            </span>

                            <span className="ml-2">
                                {bon_commande.nombre_devis ?? '—'}
                            </span>
                        </div>




                        <div>
                            <span className="text-gray-500">
                                TVA applicable:
                            </span>

                            <span className="ml-2">
                                {bon_commande.tva_applicable || 0}%
                            </span>
                        </div>

                    </div>

                </div>


                {/* =====================================================
                    DESIGNATIONS
                ====================================================== */}

                <div className="bg-white rounded-xl shadow p-6">

                    <div className="flex items-center justify-between mb-4">

                        <h3 className="text-md font-semibold text-gray-700">
                            Désignations
                        </h3>

                    </div>


                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="bg-gray-50 text-gray-600 text-xs">

                                    <th className="text-left p-3">
                                        N°
                                    </th>

                                    <th className="text-left p-3">
                                        Désignation
                                    </th>

                                    <th className="text-center p-3">
                                        Unité
                                    </th>

                                    <th className="text-center p-3">
                                        Qté
                                    </th>


                                    {estAttribue ? (

                                        <>
                                            <th className="text-right p-3">
                                                PU HT
                                            </th>

                                            <th className="text-right p-3">
                                                Montant HT
                                            </th>

                                            <th className="text-center p-3">
                                                TVA %
                                            </th>

                                            <th className="text-right p-3">
                                                Montant TVA
                                            </th>

                                            <th className="text-right p-3">
                                                Montant TTC
                                            </th>
                                        </>

                                    ) : (

                                        <th className="text-center p-3">
                                            TVA %
                                        </th>

                                    )}


                                    <th className="text-center p-3">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bon_commande.designations?.length > 0 ? (

                                    bon_commande.designations.map((d) => (

                                        <tr
                                            key={d.id_designation}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="p-3 text-center">
                                                {d.num_ordre}
                                            </td>


                                            <td className="p-3">
                                                {d.designation}
                                            </td>


                                            <td className="p-3 text-center">
                                                {d.unite?.libelle || '—'}
                                            </td>


                                            <td className="p-3 text-center">
                                                {d.quantite}
                                            </td>


                                            {estAttribue ? (

                                                <>

                                                    <td className="p-3 text-right">
                                                        {Number(
                                                            d.prix_unitaire_ht || 0
                                                        ).toLocaleString(
                                                            'fr-MA',
                                                            {
                                                                minimumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </td>


                                                    <td className="p-3 text-right">
                                                        {Number(
                                                            d.montant_ht || 0
                                                        ).toLocaleString(
                                                            'fr-MA',
                                                            {
                                                                minimumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </td>


                                                    <td className="p-3 text-center">
                                                        {d.tva || 0}%
                                                    </td>


                                                    <td className="p-3 text-right text-orange-600">
                                                        {(
                                                            Number(
                                                                d.montant_ht || 0
                                                            ) *
                                                            (
                                                                Number(
                                                                    d.tva || 0
                                                                ) / 100
                                                            )
                                                        ).toLocaleString(
                                                            'fr-MA',
                                                            {
                                                                minimumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </td>


                                                    <td className="p-3 text-right font-bold text-blue-700">
                                                        {Number(
                                                            d.montant_ttc || 0
                                                        ).toLocaleString(
                                                            'fr-MA',
                                                            {
                                                                minimumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </td>

                                                </>

                                            ) : (

                                                <td className="p-3 text-center">
                                                    {d.tva || 0}%
                                                </td>

                                            )}


                                            <td className="p-3 text-center">

                                                <div className="flex justify-center gap-3">

                                                    <Link
                                                        href={`/designations/${d.id_designation}/edit`}
                                                        className="text-orange-500 hover:text-orange-700 text-xs"
                                                    >
                                                        ✏️ Modifier
                                                    </Link>


                                                    <Link
                                                        href={`/designations/${d.id_designation}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-500 hover:text-red-700 text-xs"
                                                        onClick={(e) => {

                                                            if (
                                                                !confirm(
                                                                    'Supprimer cette désignation ?'
                                                                )
                                                            ) {
                                                                e.preventDefault();
                                                            }

                                                        }}
                                                    >
                                                        🗑️ Supprimer
                                                    </Link>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={
                                                estAttribue ? 10 : 6
                                            }
                                            className="p-8 text-center text-gray-400 italic"
                                        >
                                            Aucune désignation
                                        </td>

                                    </tr>

                                )}

                            </tbody>


                            {/* =================================================
                                TOTAUX
                            ================================================== */}

                            {estAttribue &&
                                bon_commande.designations?.length > 0 && (

                                    <tfoot>

                                        <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">

                                            <td
                                                colSpan="5"
                                                className="p-3 text-right text-gray-600"
                                            >
                                                Total BC :
                                            </td>


                                            <td className="p-3 text-right">
                                                {total_ht.toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}{' '}
                                                MAD
                                            </td>


                                            <td></td>


                                            <td className="p-3 text-right text-orange-600">
                                                {total_tva.toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}{' '}
                                                MAD
                                            </td>


                                            <td className="p-3 text-right text-blue-700 font-bold">
                                                {total_ttc.toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}{' '}
                                                MAD
                                            </td>


                                            <td></td>

                                        </tr>


                                        <tr className="bg-blue-700 text-white">

                                            <td
                                                colSpan="7"
                                                className="p-3 text-right font-bold"
                                            >
                                                Montant Total TTC du Bon de
                                                Commande :
                                            </td>


                                            <td
                                                colSpan="3"
                                                className="p-3 text-right font-bold text-lg"
                                            >
                                                {total_ttc.toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}{' '}
                                                MAD
                                            </td>

                                        </tr>

                                    </tfoot>

                                )}

                        </table>

                    </div>

                </div>


                {/* =====================================================
                    DEVIS RECUS
                ====================================================== */}

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-md font-semibold text-gray-700 mb-4">
                        Devis reçus
                    </h3>


                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="bg-gray-50 text-gray-600 text-xs">

                                    <th className="text-left p-3">
                                        Fournisseur
                                    </th>

                                    <th className="text-left p-3">
                                        Référence
                                    </th>

                                    <th className="text-right p-3">
                                        Montant HT
                                    </th>

                                    <th className="text-right p-3">
                                        TVA
                                    </th>

                                    <th className="text-right p-3">
                                        Montant TTC
                                    </th>

                                    <th className="text-left p-3">
                                        Date
                                    </th>

                                    <th className="text-center p-3">
                                        Statut
                                    </th>

                                    <th className="text-center p-3">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bon_commande.devis?.length > 0 ? (

                                    bon_commande.devis.map((d) => (

                                        <tr
                                            key={d.id_devis}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="p-3 font-medium">
                                                {d.fournisseur?.raison_sociale ||
                                                    '—'}
                                            </td>


                                            <td className="p-3 font-mono text-xs">
                                                {d.reference_devis || '—'}
                                            </td>


                                            <td className="p-3 text-right">
                                                {Number(
                                                    d.montant_ht || 0
                                                ).toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>


                                            <td className="p-3 text-right text-orange-600">
                                                {Number(
                                                    d.montant_tva || 0
                                                ).toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>


                                            <td className="p-3 text-right font-bold text-blue-700">
                                                {Number(
                                                    d.montant_ttc || 0
                                                ).toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>


                                            <td className="p-3">
                                                {d.date_devis || '—'}
                                            </td>


                                            <td className="p-3 text-center">

                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                                        d.statut?.nom_fr ===
                                                        'retenu'
                                                            ? 'bg-green-100 text-green-700'
                                                            : d.statut?.nom_fr ===
                                                              'rejeté'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {d.statut?.nom_fr ||
                                                        'reçu'}
                                                </span>

                                            </td>


                                            <td className="p-3 text-center">

                                                {d.statut?.nom_fr !==
                                                    'retenu' && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            retenir(
                                                                d.id_devis
                                                            )
                                                        }
                                                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                                                    >
                                                        Retenir
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="p-6 text-center text-gray-400 italic"
                                        >
                                            Aucun devis reçu
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>


                {/* =====================================================
                    RETOUR
                ====================================================== */}

                <div className="flex gap-3">

                    <Link
                        href="/bons-commande"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
                    >
                        ← Retour
                    </Link>

                </div>

            </div>

        </AppLayout>
    );
}