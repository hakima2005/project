import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function NaturePrestationIndex({ natures = [] }) {
    return (
        <AppLayout title="Natures de prestation">

            <Card
                title="Natures de prestation"
                subtitle="Liste des natures de prestation"
                actions={
                    <Button as={Link} href="/natures-prestation/create" variant="primary">
                        <Plus size={16} /> Nouvelle nature
                    </Button>
                }
            >

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="bg-cream-100 text-gray-600">

                                <th className="text-left p-3 rounded-l-lg">
                                    Code
                                </th>

                                <th className="text-left p-3">
                                    Intitulé FR
                                </th>

                                <th className="text-left p-3">
                                    Type de catégorie
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

                            {natures.length > 0 ? (

                                natures.map((nature) => (

                                    <tr
                                        key={nature.code_nat_prest}
                                        className="border-b border-cream-200 hover:bg-cream-50"
                                    >

                                        {/* Code */}
                                        <td className="p-3 font-mono text-navy-700">
                                            {nature.code_nat_prest}
                                        </td>

                                        {/* Intitulé */}
                                        <td className="p-3 text-navy-900">
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

                                                <Badge tone="success">
                                                    {nature.statut.nom_fr}
                                                </Badge>

                                            ) : (

                                                <span className="text-gray-400 text-xs">
                                                    N/A
                                                </span>

                                            )}

                                        </td>

                                        {/* Actions */}
                                        <td className="p-3">

                                            <div className="flex items-center gap-3">

                                                <Link
                                                    href={`/natures-prestation/${nature.code_nat_prest}/edit`}
                                                    className="text-gold-600 hover:text-gold-700"
                                                    title="Modifier"
                                                >
                                                    <Pencil size={16} />
                                                </Link>

                                                <Link
                                                    href={`/natures-prestation/${nature.code_nat_prest}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-rose-600 hover:text-rose-700"
                                                    title="Supprimer"
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
                                                    <Trash2 size={16} />
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-400"
                                    >
                                        Aucune nature de prestation
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