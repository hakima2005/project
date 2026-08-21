import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function FamilleIndex({ familles }) {
    return (
        <AppLayout title="Familles budgétaires">
            <Card
                title="Liste des familles"
                actions={
                    <Button as={Link} href="/familles/create" variant="primary">
                        <Plus size={16} /> Nouvelle famille
                    </Button>
                }
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">Code</th>
                            <th className="text-left p-3">Nom FR</th>
                            <th className="text-left p-3">Nom AR</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {familles?.length > 0 ? familles.map((f) => (
                            <tr key={f.code_famille} className="border-t border-cream-200 hover:bg-cream-50">
                                <td className="p-3 font-mono text-navy-700">{f.code_famille}</td>
                                <td className="p-3 text-navy-900">{f.nom_fr}</td>
                                <td className="p-3">{f.nom_ar}</td>
                                <td className="p-3">
                                    <Badge tone="success">{f.statut?.nom_fr || 'N/A'}</Badge>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/familles/${f.code_famille}/edit`} className="text-gold-600 hover:text-gold-700" title="Modifier">
                                            <Pencil size={16} />
                                        </Link>
                                        <Link href={`/familles/${f.code_famille}`} method="delete" as="button"
                                            className="text-rose-600 hover:text-rose-700" title="Supprimer"
                                            onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>
                                            <Trash2 size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400">Aucune famille trouvée</td></tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}
