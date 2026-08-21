import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ typeMt }) {

    const { data, setData, put, processing, errors } = useForm({
        libelle: typeMt.libelle,
        actif: typeMt.actif,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/type-mts/${typeMt.id_type_mt}`);
    };

    return (
        <AppLayout title="Modifier un type de montant">

            <div className="max-w-xl">
                <Card title="Modifier un type de montant">

                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Libellé
                            </label>

                            <input
                                type="text"
                                value={data.libelle}
                                onChange={e => setData('libelle', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />

                            {errors.libelle && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.libelle}
                                </p>
                            )}
                        </div>


                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Statut
                            </label>

                            <select
                                value={data.actif ? 1 : 0}
                                onChange={e => setData('actif', Number(e.target.value))}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            >
                                <option value={1}>Actif</option>
                                <option value={0}>Inactif</option>
                            </select>
                        </div>

                        <div className="flex gap-3">

                            <Button type="submit" variant="primary" disabled={processing}>
                                Enregistrer
                            </Button>

                            <Button as={Link} href="/type-mts" variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>

        </AppLayout>
    );
}