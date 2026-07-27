import AppLayout from '@/Layouts/AppLayout';

export default function JournalIndex({ journals }) {
    return (
        <AppLayout title="Journal de traçabilité">
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-md font-semibold text-gray-700 mb-6">Historique des opérations</h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Date / Heure</th>
                            <th className="text-left p-3">Utilisateur</th>
                            <th className="text-left p-3">Action</th>
                            <th className="text-left p-3">Adresse IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journals?.data?.length > 0 ? journals.data.map((j) => (
                            <tr key={j.id_journal} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono text-xs">{j.date_heure}</td>
                                <td className="p-3">{j.utilisateur?.nom}</td>
                                <td className="p-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{j.type_action?.libelle}</span></td>
                                <td className="p-3 font-mono text-xs">{j.adresse_ip}</td>
                            </tr>
                        )) : <tr><td colSpan="4" className="p-6 text-center text-gray-400">Aucune opération enregistrée</td></tr>}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
