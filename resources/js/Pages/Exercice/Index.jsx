import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

export default function ExerciceIndex({ exercices }) {

    return (
        <AppLayout title="Exercices budgétaires">

            <Card
                title="Liste des exercices"
                actions={
                    <Button as={Link} href="/exercices/create" variant="primary">
                        <Plus size={16} /> Nouvel exercice
                    </Button>
                }
            >

                <table className="w-full text-sm">

                    <thead>

                        <tr className="bg-cream-100 text-gray-600">

                            <th className="text-left p-3 rounded-l-lg">Année</th>

                            <th className="text-left p-3">
                                Statut
                            </th>

                            <th className="text-left p-3 rounded-r-lg">
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
                                        className="border-t border-cream-200 hover:bg-cream-50"
                                    >

                                        <td className="p-3 font-bold text-navy-900">
                                            {ex.annee}
                                        </td>

                                        <td className="p-3">

                                            <Badge tone="success">
                                                {ex.statut?.nom_fr}
                                            </Badge>

                                        </td>

                                        <td className="p-3">

                                            <div className="flex items-center gap-3">

                                                <Link
                                                    href={`/exercices/${ex.id_exercice}`}
                                                    className="text-navy-600 hover:text-navy-800"
                                                    title="Voir"
                                                >
                                                    <Eye size={16} />
                                                </Link>

                                                <Link
                                                    href={`/exercices/${ex.id_exercice}/edit`}
                                                    className="text-gold-600 hover:text-gold-700"
                                                    title="Modifier"
                                                >
                                                    <Pencil size={16} />
                                                </Link>

                                                <Link
                                                    href={`/exercices/${ex.id_exercice}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-rose-600 hover:text-rose-700"
                                                    title="Supprimer"
                                                    onClick={(e) => {
                                                        if (!confirm('Supprimer cet exercice ?'))
                                                            e.preventDefault();
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </Link>

                                            </div>

                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="p-8 text-center text-gray-400"
                                >
                                    Aucun exercice trouvé
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </Card>

        </AppLayout>
    );
}