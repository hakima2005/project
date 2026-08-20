import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Badge, { statutToTone } from '@/Components/ui/Badge';
import { Wallet, ClipboardList, Hourglass, Building2, BarChart3, CircleCheck } from 'lucide-react';

export default function Dashboard({ stats }) {
    const cards = [
        { label: 'Budget Global',      value: stats?.budget_global || '0 MAD',     bg: 'bg-navy-800',   icon: Wallet },
        { label: 'Bons de commande',    value: stats?.total_bc || 0,                bg: 'bg-emerald-600', icon: ClipboardList },
        { label: 'BC en cours',         value: stats?.bc_en_cours || 0,             bg: 'bg-gold-500',    icon: Hourglass },
        { label: 'Fournisseurs actifs', value: stats?.fournisseurs || 0,            bg: 'bg-navy-600',   icon: Building2 },
        { label: 'Budget engagé',       value: stats?.budget_engage || '0 MAD',     bg: 'bg-rose-600',    icon: BarChart3 },
        { label: 'Budget disponible',   value: stats?.budget_disponible || '0 MAD', bg: 'bg-emerald-500', icon: CircleCheck },
    ];

    return (
        <AppLayout title="Tableau de bord">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-card border border-cream-200 p-6 flex items-center gap-4"
                        >
                            <div className={`${card.bg} text-white w-14 h-14 rounded-full flex items-center justify-center shrink-0`}>
                                <Icon size={22} strokeWidth={1.8} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <p className="text-xl font-display font-bold text-navy-900">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tableau récap */}
            <Card title="Derniers bons de commande">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-cream-100 text-gray-600">
                            <th className="text-left p-3 rounded-l-lg">Référence</th>
                            <th className="text-left p-3">Objet</th>
                            <th className="text-left p-3">Montant</th>
                            <th className="text-left p-3 rounded-r-lg">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats?.derniers_bc?.length > 0 ? (
                            stats.derniers_bc.map((bc, i) => (
                                <tr key={i} className="border-t border-cream-200 hover:bg-cream-50">
                                    <td className="p-3 font-mono text-navy-700">{bc.reference_bc}</td>
                                    <td className="p-3">{bc.objet}</td>
                                    <td className="p-3">{bc.montant_estimatif} MAD</td>
                                    <td className="p-3">
                                        <Badge tone={statutToTone(bc.statut?.nom_fr)}>
                                            {bc.statut?.nom_fr || 'N/A'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-6 text-center text-gray-400">
                                    Aucun bon de commande
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </AppLayout>
    );
}