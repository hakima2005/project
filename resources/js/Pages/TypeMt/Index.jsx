import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Pencil } from 'lucide-react';

export default function Index({ typesMt }) {
    return (
        <AppLayout title="Types de montant">

            <Card
                title="Liste des types de montant"
                actions={
                    <Button as={Link} href="/type-mts/create" variant="primary">
                        <Plus size={16} /> Ajouter un type
                    </Button>
                }
            >

                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">ID</th>
                            <th className="text-left p-3">Libellé</th>
                            <th className="text-center p-3">Actif</th>
                            <th className="text-center p-3 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {typesMt.map(type => (
                            <tr key={type.id_type_mt} className="border-t border-cream-200 hover:bg-cream-50">

                                <td className="p-3 text-gray-500">
                                    {type.id_type_mt}
                                </td>

                                <td className="p-3 font-medium text-navy-900">
                                    {type.libelle}
                                </td>

                                <td className="p-3 text-center">
                                    <Badge tone={type.actif ? 'success' : 'danger'}>
                                        {type.actif ? 'Oui' : 'Non'}
                                    </Badge>
                                </td>

                                <td className="p-3 text-center">
                                    <Link
                                        href={`/type-mts/${type.id_type_mt}/edit`}
                                        className="inline-flex items-center gap-1 text-gold-600 hover:text-gold-700 text-xs font-medium"
                                    >
                                        <Pencil size={14} /> Modifier
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </Card>

        </AppLayout>
    );
}