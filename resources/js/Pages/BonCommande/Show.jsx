import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge, { statutToTone } from '@/Components/ui/Badge';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';

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

                <Card
                    title="Informations générales"
                    actions={
                        <Badge tone={statutToTone(statutActuel)}>
                            {statutActuel}
                        </Badge>
                    }
                >

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <span className="text-gray-500">
                                Référence:
                            </span>

                            <span className="font-mono font-bold ml-2 text-navy-900">
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

                </Card>


                {/* =====================================================
                    DESIGNATIONS
                ====================================================== */}

                <Card title="Désignations">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="bg-cream-100 text-gray-600 text-xs">

                                    <th className="text-left p-3 rounded-l-lg">
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


                                    <th className="text-center p-3 rounded-r-lg">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bon_commande.designations?.length > 0 ? (

                                    bon_commande.designations.map((d) => (

                                        <tr
                                            key={d.id_designation}
                                            className="border-t border-cream-200 hover:bg-cream-50"
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


                                                    <td className="p-3 text-right text-gold-700">
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


                                                    <td className="p-3 text-right font-bold text-navy-800">
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
                                                        className="text-gold-600 hover:text-gold-700"
                                                        title="Modifier"
                                                    >
                                                        <Pencil size={15} />
                                                    </Link>


                                                    <Link
                                                        href={`/designations/${d.id_designation}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-rose-500 hover:text-rose-700"
                                                        title="Supprimer"
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
                                                        <Trash2 size={15} />
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

                                        <tr className="border-t-2 border-navy-200 bg-cream-100 font-semibold">

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


                                            <td className="p-3 text-right text-gold-700">
                                                {total_tva.toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}{' '}
                                                MAD
                                            </td>


                                            <td className="p-3 text-right text-navy-800 font-bold">
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


                                        <tr className="bg-navy-800 text-white">

                                            <td
                                                colSpan="7"
                                                className="p-3 text-right font-bold"
                                            >
                                                Montant Total TTC du Bon de
                                                Commande :
                                            </td>


                                            <td
                                                colSpan="3"
                                                className="p-3 text-right font-bold text-lg text-gold-300"
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

                </Card>


                {/* =====================================================
                    DEVIS RECUS
                ====================================================== */}

                <Card title="Devis reçus">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="bg-cream-100 text-gray-600 text-xs">

                                    <th className="text-left p-3 rounded-l-lg">
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

                                    <th className="text-center p-3 rounded-r-lg">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {bon_commande.devis?.length > 0 ? (

                                    bon_commande.devis.map((d) => (

                                        <tr
                                            key={d.id_devis}
                                            className="border-t border-cream-200 hover:bg-cream-50"
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


                                            <td className="p-3 text-right text-gold-700">
                                                {Number(
                                                    d.montant_tva || 0
                                                ).toLocaleString(
                                                    'fr-MA',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>


                                            <td className="p-3 text-right font-bold text-navy-800">
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

                                                <Badge
                                                    tone={
                                                        d.statut?.nom_fr ===
                                                        'retenu'
                                                            ? 'success'
                                                            : d.statut?.nom_fr ===
                                                              'rejeté'
                                                            ? 'danger'
                                                            : 'neutral'
                                                    }
                                                >
                                                    {d.statut?.nom_fr ||
                                                        'reçu'}
                                                </Badge>

                                            </td>


                                            <td className="p-3 text-center">

                                                {d.statut?.nom_fr !==
                                                    'retenu' && (

                                                    <Button
                                                        type="button"
                                                        variant="primary"
                                                        className="!bg-emerald-600 hover:!bg-emerald-700 !px-3 !py-1 !text-xs"
                                                        onClick={() =>
                                                            retenir(
                                                                d.id_devis
                                                            )
                                                        }
                                                    >
                                                        Retenir
                                                    </Button>

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

                </Card>


                {/* =====================================================
                    RETOUR
                ====================================================== */}

                <div className="flex gap-3">

                    <Button as={Link} href="/bons-commande" variant="secondary">
                        <ArrowLeft size={16} /> Retour
                    </Button>

                </div>

            </div>

        </AppLayout>
    );
}