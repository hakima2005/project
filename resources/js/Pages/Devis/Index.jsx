import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link, router } from '@inertiajs/react';
import { Upload, Plus, Pencil, CheckCircle2, Trash2 } from 'lucide-react';


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

            <Card
                title="Liste des devis"
                actions={
                    <div className="flex gap-3">

                        <Button
                            as={Link}
                            href={route('devis.import')}
                            variant="secondary"
                        >
                            <Upload size={16} /> Importer un document
                        </Button>

                        <Button
                            as={Link}
                            href={route('devis.create')}
                            variant="primary"
                        >
                            <Plus size={16} /> Nouveau devis
                        </Button>

                    </div>
                }
            >

                {/* =====================================================
                    TABLE
                ====================================================== */}

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="bg-cream-100 text-gray-600">

                                <th className="text-left p-3 rounded-l-lg">
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

                                <th className="text-left p-3 rounded-r-lg">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {devis.length > 0 ? (

                                devis.map((d) => (

                                    <tr
                                        key={d.id_devis}
                                        className="border-t border-cream-200 hover:bg-cream-50"
                                    >

                                        {/* Référence */}

                                        <td className="p-3 font-mono text-navy-700">
                                            {d.reference_devis}
                                        </td>


                                        {/* BC */}

                                        <td className="p-3 text-navy-600">
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

                                        <td className="p-3 text-navy-600">
                                            {formatMontant(
                                                d.montant_tva
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* RAS */}

                                        <td className="p-3 text-gold-700">
                                            {formatMontant(
                                                d.montant_retenue
                                            )}{' '}
                                            MAD
                                        </td>


                                        {/* TTC */}

                                        <td className="p-3 font-semibold text-navy-900">
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

                                            <Badge
                                                tone={
                                                    d.statut?.nom_fr === 'retenu'
                                                        ? 'success'
                                                        : d.statut?.nom_fr === 'rejeté'
                                                        ? 'danger'
                                                        : 'neutral'
                                                }
                                            >
                                                {d.statut?.nom_fr ||
                                                    'reçu'}
                                            </Badge>

                                        </td>


                                        {/* Actions */}

                                        <td className="p-3">

                                            <div className="flex items-center gap-3 whitespace-nowrap">

                                                {/* Modifier */}

                                                <Link
                                                    href={route(
                                                        'devis.edit',
                                                        d.id_devis
                                                    )}
                                                    className="text-gold-600 hover:text-gold-700"
                                                    title="Modifier"
                                                >
                                                    <Pencil size={16} />
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
                                                            className="text-emerald-600 hover:text-emerald-700"
                                                            title="Retenir"
                                                        >
                                                            <CheckCircle2 size={16} />
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
                                                    className="text-rose-600 hover:text-rose-700"
                                                    title="Supprimer"
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
                                                    <Trash2 size={16} />
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

            </Card>

        </AppLayout>
    );
}