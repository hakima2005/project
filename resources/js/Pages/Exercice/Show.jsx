import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Coins } from 'lucide-react';

export default function Show({ exercice }) {

    const total = exercice.types_montant.reduce(
        (sum, item) => sum + Number(item.montant),
        0
    );

    return (
        <AppLayout title={`Exercice ${exercice.annee}`}>

            <div className="max-w-3xl space-y-6">

                <Card
                    title={`Exercice ${exercice.annee}`}
                    actions={
                        <Badge tone="success">
                            {exercice.statut?.nom_fr}
                        </Badge>
                    }
                >

                    <div className="grid grid-cols-2 gap-4 text-sm">

                        <div>
                            <span className="text-gray-500">
                                Année
                            </span>
                            <p className="font-semibold text-navy-900">
                                {exercice.annee}
                            </p>
                        </div>

                        <div>
                            <span className="text-gray-500">
                                Date de visée
                            </span>
                            <p className="font-semibold">
                                {exercice.date_visee || '—'}
                            </p>
                        </div>

                        <div className="col-span-2">
                            <span className="text-gray-500">
                                Observations
                            </span>
                            <p className="font-semibold">
                                {exercice.observations || '—'}
                            </p>
                        </div>

                    </div>

                </Card>

                <Card title="Types de montant">

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-cream-100 text-gray-600">
                                <th className="text-left p-3 rounded-l-lg">
                                    Type
                                </th>
                                <th className="text-right p-3 rounded-r-lg">
                                    Montant
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {exercice.types_montant.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t border-cream-200"
                                >
                                    <td className="p-3">
                                        {item.type_mt.libelle}
                                    </td>
                                    <td className="p-3 text-right font-medium">
                                        {Number(item.montant).toLocaleString()} DH
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Montant Global */}

                    <div className="mt-4 bg-navy-800 rounded-xl p-5 flex items-center justify-between">

                        <span className="flex items-center gap-2 font-display font-semibold text-white">
                            <Coins size={18} className="text-gold-400" />
                            Montant Global
                        </span>

                        <span className="font-bold text-xl text-gold-300">
                            {Number(total).toLocaleString()} DH
                        </span>

                    </div>

                </Card>

                <Button as={Link} href="/exercices" variant="secondary">
                    <ArrowLeft size={16} /> Retour
                </Button>

            </div>

        </AppLayout>
    );
}