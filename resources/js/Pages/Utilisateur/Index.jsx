import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function UtilisateurIndex({ utilisateurs }) {
    return (
        <AppLayout title="Utilisateurs">
            <Card
                title="Liste des utilisateurs"
                actions={
                    <Button as={Link} href="/utilisateurs/create" variant="primary">
                        <Plus size={16} /> Nouvel utilisateur
                    </Button>
                }
            >
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">Nom</th>
                            <th className="text-left p-3">Prénom</th>
                            <th className="text-left p-3">Login</th>
                            <th className="text-left p-3">Profil</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3 rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs?.length > 0 ? utilisateurs.map((u) => (
                            <tr key={u.id_utilisateur} className="border-t border-cream-200 hover:bg-cream-50">
                                <td className="p-3 font-medium text-navy-900">{u.nom}</td>
                                <td className="p-3">{u.prenom}</td>
                                <td className="p-3 font-mono text-xs text-navy-700">{u.login}</td>
                                <td className="p-3">
                                    <Badge tone="navy">{u.profil?.libelle || 'N/A'}</Badge>
                                </td>
                                <td className="p-3">
                                    <Badge tone="success">{u.statut?.nom_fr || 'N/A'}</Badge>
                                </td>
                                <td className="p-3">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/utilisateurs/${u.id_utilisateur}/edit`} className="text-gold-600 hover:text-gold-700" title="Modifier">
                                            <Pencil size={16} />
                                        </Link>
                                        <Link href={`/utilisateurs/${u.id_utilisateur}`} method="delete" as="button" className="text-rose-600 hover:text-rose-700" title="Supprimer"
                                            onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>
                                            <Trash2 size={16} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" className="p-8 text-center text-gray-400">Aucun utilisateur</td></tr>}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}