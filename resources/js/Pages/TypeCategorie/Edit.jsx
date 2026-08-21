import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ typeCategorie }) {
    const { data, setData, put, processing, errors } = useForm({
        libelle: typeCategorie.libelle,
        id_statut: typeCategorie.id_statut,
    });
    const submit = (e) => {
        e.preventDefault();
        put(`/type-categories/${typeCategorie.id_type_categorie}`);
    };
    return (
        <AppLayout title="Modifier un type de catégorie">
            <div className="max-w-xl">
                <Card title="Modifier un type de catégorie">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Libellé
                            </label>
                            <input
                                type="text"
                                value={data.libelle}
                                onChange={(e) =>
                                    setData('libelle', e.target.value)
                                }
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
                                value={data.id_statut}
                                onChange={(e) =>
                                    setData('id_statut', Number(e.target.value))
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            >
                                <option value={2}>Actif</option>
                                <option value={3}>Inactif</option>
                            </select>
                            {errors.id_statut && (
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.id_statut}
                                </p>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button type="submit" variant="primary" disabled={processing}>
                                Enregistrer
                            </Button>
                            <Button as={Link} href="/type-categories" variant="secondary">
                                Annuler
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}