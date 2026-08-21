import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function FournisseurIndex({ fournisseurs }) {
    return (
        <AppLayout title="Fournisseurs">
            <Card
                title="Liste des fournisseurs"
                actions={
                    <Button as={Link} href="/fournisseurs/create" variant="primary">
                        <Plus size={16} /> Nouveau fournisseur
                    </Button>
                }
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">Raison sociale</th>
                            <th className="text-left p-3">ICE</th>
                            <th className="text-left p-3">Téléphone</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs?.length > 0 ? fournisseurs.map((f) => (
                            <tr key={f.id_fournisseur} className="border-t border-cream-200 hover:bg-cream-50">
                                <td className="p-3 font-medium text-navy-900">{f.raison_sociale}</td>
                                <td className="p-3 font-mono text-xs">{f.ICE}</td>
                                <td className="p-3">{f.telephone}</td>
                                <td className="p-3">{f.email}</td>
                                <td className="p-3">
                                    <Badge tone="success">{f.statut?.nom_fr || 'N/A'}</Badge>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/fournisseurs/${f.id_fournisseur}/edit`} className="text-gold-600 hover:text-gold-700" title="Modifier">
                                            <Pencil size={16} />
                                        </Link>
                                        <Link href={`/fournisseurs/${f.id_fournisseur}`} method="delete" as="button" className="text-rose-600 hover:text-rose-700" title="Supprimer"
                                            onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>
                                            <Trash2 size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" className="p-8 text-center text-gray-400">Aucun fournisseur</td></tr>}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}
