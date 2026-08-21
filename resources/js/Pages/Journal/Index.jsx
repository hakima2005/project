import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';

export default function JournalIndex({ journals }) {
    return (
        <AppLayout title="Journal de traçabilité">
            <Card title="Historique des opérations">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">Date / Heure</th>
                            <th className="text-left p-3">Utilisateur</th>
                            <th className="text-left p-3">Action</th>
                            <th className="text-left p-3 rounded-r-lg">Adresse IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journals?.data?.length > 0 ? journals.data.map((j) => (
                            <tr key={j.id_journal} className="border-t border-cream-200 hover:bg-cream-50">
                                <td className="p-3 font-mono text-xs">{j.date_heure}</td>
                                <td className="p-3">{j.utilisateur?.nom}</td>
                                <td className="p-3">
                                    <Badge tone="navy">{j.type_action?.libelle}</Badge>
                                </td>
                                <td className="p-3 font-mono text-xs">{j.adresse_ip}</td>
                            </tr>
                        )) : <tr><td colSpan="4" className="p-8 text-center text-gray-400">Aucune opération enregistrée</td></tr>}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}