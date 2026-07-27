import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ stats }) {
    const cards = [
        { label: 'Budget Global',        value: stats?.budget_global || '0 MAD',    color: 'bg-blue-500',   icon: '💰' },
        { label: 'Bons de commande',      value: stats?.total_bc || 0,               color: 'bg-green-500',  icon: '📝' },
        { label: 'BC en cours',           value: stats?.bc_en_cours || 0,            color: 'bg-orange-500', icon: '⏳' },
        { label: 'Fournisseurs actifs',   value: stats?.fournisseurs || 0,           color: 'bg-purple-500', icon: '🏢' },
        { label: 'Budget engagé',         value: stats?.budget_engage || '0 MAD',    color: 'bg-red-500',    icon: '📊' },
        { label: 'Budget disponible',     value: stats?.budget_disponible || '0 MAD',color: 'bg-teal-500',   icon: '✅' },
    ];

    return (
        <AppLayout title="Tableau de bord">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <div className={`${card.color} text-white text-2xl w-14 h-14 rounded-full flex items-center justify-center`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{card.label}</p>
                            <p className="text-xl font-bold text-gray-700">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tableau récap */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4">Derniers bons de commande</h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="text-left p-3">Référence</th>
                            <th className="text-left p-3">Objet</th>
                            <th className="text-left p-3">Montant</th>
                            <th className="text-left p-3">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats?.derniers_bc?.length > 0 ? (
                            stats.derniers_bc.map((bc, i) => (
                                <tr key={i} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-mono text-blue-600">{bc.reference_bc}</td>
                                    <td className="p-3">{bc.objet}</td>
                                    <td className="p-3">{bc.montant_estimatif} MAD</td>
                                    <td className="p-3">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                            {bc.statut?.nom_fr || 'N/A'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-3 text-center text-gray-400">Aucun bon de commande</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
