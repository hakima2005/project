import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function UtilisateurIndex({ utilisateurs }) {
    return (
        <AppLayout title="Utilisateurs">
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-md font-semibold text-gray-700">Liste des utilisateurs</h3>
                    <Link href="/utilisateurs/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">+ Nouvel utilisateur</Link>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Nom</th>
                            <th className="text-left p-3">Prénom</th>
                            <th className="text-left p-3">Login</th>
                            <th className="text-left p-3">Profil</th>
                            <th className="text-left p-3">Statut</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs?.length > 0 ? utilisateurs.map((u) => (
                            <tr key={u.id_utilisateur} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{u.nom}</td>
                                <td className="p-3">{u.prenom}</td>
                                <td className="p-3 font-mono text-blue-600">{u.login}</td>
                                <td className="p-3"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">{u.profil?.libelle || 'N/A'}</span></td>
                                <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{u.statut?.nom_fr || 'N/A'}</span></td>
                                <td className="p-3 flex gap-2">
                                    <Link href={`/utilisateurs/${u.id_utilisateur}/edit`} className="text-orange-600 hover:underline">Modifier</Link>
                                    <Link href={`/utilisateurs/${u.id_utilisateur}`} method="delete" as="button" className="text-red-600 hover:underline"
                                        onClick={(e) => { if (!confirm('Supprimer ?')) e.preventDefault(); }}>Supprimer</Link>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" className="p-6 text-center text-gray-400">Aucun utilisateur</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
