import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ natures, decret }) {

    const { data, setData, put, processing, errors } = useForm({
        date: decret.date || '',
        code_nat_prest: decret.code_nat_prest || '',
        taux: decret.taux ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/decret-ras/${decret.id}`);
    };

    return (
        <AppLayout title="Modifier le décret RAS">

            <div className="max-w-lg">
                <Card title="Modifier le décret RAS">

                    <form onSubmit={submit} className="space-y-4">

                        {/* DATE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date *
                            </label>

                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData('date', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.date && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        {/* NATURE */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nature de prestation *
                            </label>

                            <select
                                value={data.code_nat_prest}
                                onChange={(e) =>
                                    setData(
                                        'code_nat_prest',
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            >
                                <option value="">
                                    -- Choisir une nature --
                                </option>

                                {natures?.map((nature) => (
                                    <option
                                        key={nature.code_nat_prest}
                                        value={nature.code_nat_prest}
                                    >
                                        {nature.intitule_fr}
                                    </option>
                                ))}
                            </select>

                            {errors.code_nat_prest && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.code_nat_prest}
                                </p>
                            )}
                        </div>

                        {/* TAUX */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Taux (%) *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={data.taux}
                                onChange={(e) =>
                                    setData('taux', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                placeholder="Ex: 10"
                            />

                            {errors.taux && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.taux}
                                </p>
                            )}
                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-3 pt-3">

                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing
                                    ? 'Modification...'
                                    : 'Enregistrer'}
                            </Button>

                            <Button as={Link} href="/decret-ras" variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>

        </AppLayout>
    );
}