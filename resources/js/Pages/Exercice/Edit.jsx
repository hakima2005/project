import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';
import { Coins } from 'lucide-react';

export default function Edit({ exercice, typesMt, montants }) {

    const montantsInitiaux = {};

    montants.forEach((item) => {
        montantsInitiaux[item.id_type_mt] = item.montant;
    });

    const { data, setData, put, processing, errors } = useForm({
        annee: exercice.annee,
        date_debut: exercice.date_debut ?? '',
        date_fin: exercice.date_fin ?? '',
        date_visee: exercice.date_visee ?? '',
        observations: exercice.observations ?? '',
        montants: montantsInitiaux,
    });

    const total = Object.values(data.montants).reduce(
        (sum, value) => sum + (parseFloat(value) || 0),
        0
    );

    function submit(e) {
        e.preventDefault();
        put(`/exercices/${exercice.id_exercice}`);
    }

    return (
        <AppLayout title={`Modifier l'exercice ${exercice.annee}`}>

            <div className="max-w-2xl">

                <Card title={`Modifier l'exercice ${exercice.annee}`}>

                    <form onSubmit={submit} className="space-y-5">

                        <div className="flex items-center gap-4">
                            <label className="w-48 font-medium text-gray-700">
                                Année :
                            </label>

                            <input
                                type="number"
                                value={data.annee}
                                onChange={(e) => setData('annee', e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date début
                                </label>
                                <input
                                    type="date"
                                    value={data.date_debut}
                                    onChange={(e) => setData('date_debut', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                                {errors.date_debut && (
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.date_debut}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date fin
                                </label>
                                <input
                                    type="date"
                                    value={data.date_fin}
                                    onChange={(e) => setData('date_fin', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                                {errors.date_fin && (
                                    <p className="text-rose-500 text-xs mt-1">
                                        {errors.date_fin}
                                    </p>
                                )}
                            </div>
                        </div>

                        <h3 className="font-display font-semibold text-navy-900 pt-2 border-t border-cream-200">
                            Types de montant
                        </h3>

                        <div className="space-y-3">
                            {typesMt.map((type) => (
                                <div
                                    key={type.id_type_mt}
                                    className="flex items-center gap-4"
                                >
                                    <label className="w-48 text-sm font-medium text-gray-700">
                                        {type.libelle} :
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={data.montants[type.id_type_mt] || ''}
                                        onChange={(e) =>
                                            setData('montants', {
                                                ...data.montants,
                                                [type.id_type_mt]: e.target.value,
                                            })
                                        }
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Montant Global */}

                        <div className="bg-navy-800 rounded-xl p-5 flex items-center justify-between">

                            <span className="flex items-center gap-2 font-display font-semibold text-white">
                                <Coins size={18} className="text-gold-400" />
                                Montant Global
                            </span>

                            <span className="font-bold text-xl text-gold-300">
                                {total.toLocaleString()} DH
                            </span>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date de visée
                            </label>

                            <input
                                type="date"
                                value={data.date_visee}
                                onChange={(e) =>
                                    setData('date_visee', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Observations
                            </label>

                            <textarea
                                rows={3}
                                value={data.observations}
                                onChange={(e) =>
                                    setData('observations', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Enregistrement...'
                                    : 'Mettre à jour'}
                            </Button>

                            <Button
                                as={Link}
                                href="/exercices"
                                variant="secondary"
                            >
                                Annuler
                            </Button>
                        </div>

                    </form>

                </Card>

            </div>

        </AppLayout>
    );
}