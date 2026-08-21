import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function Index({ decrets }) {
    const handleDelete = (id) => {
        if (confirm('Supprimer ce décret ?')) {
            router.delete(`/decret-tva/${id}`);
        }
    };

    return (
        <AppLayout title="décrets TVA">
            <Card
                title="Liste des décrets TVA"
                actions={
                    <Button as={Link} href="/decret-tva/create" variant="primary">
                        <Plus size={16} /> Ajouter
                    </Button>
                }
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="p-3 text-left rounded-l-lg">Date</th>
                            <th className="p-3 text-left">Nature de prestation</th>
                            <th className="p-3 text-right">Taux %</th>
                            <th className="p-3 text-right rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {decrets?.length > 0 ? decrets.map((d) => (
                            <tr key={d.id} className="border-t border-cream-200 hover:bg-cream-50">
                                <td className="p-3">{d.date}</td>
                                <td className="p-3 text-navy-900">{d.nature_prestation?.intitule_fr}</td>
                                <td className="p-3 text-right font-medium text-gold-700">{d.taux} %</td>
                                <td className="p-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link href={`/decret-tva/${d.id}/edit`} className="text-gold-600 hover:text-gold-700" title="Modifier">
                                            <Pencil size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(d.id)} className="text-rose-600 hover:text-rose-700" title="Supprimer">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" className="p-8 text-center text-gray-400">Aucun décret</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}