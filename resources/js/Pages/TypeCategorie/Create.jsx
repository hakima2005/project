import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        libelle: '',
        id_statut: 1,
    });
    function submit(e) {
        e.preventDefault();
        post(route('type-categories.store'));
    }
    return (
        <AppLayout title="Ajouter un type de catégorie">
            <div className="max-w-xl">
                <Card title="Ajouter un type de catégorie">
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
                            {errors.libelle &&
                                <p className="text-rose-500 text-xs mt-1">
                                    {errors.libelle}
                                </p>
                            }
                        </div>
                        <div className="flex gap-3">
                            <Button type="submit" variant="primary" disabled={processing}>
                                Enregistrer
                            </Button>
                            <Button as={Link} href={route('type-categories.index')} variant="secondary">
                                Annuler
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}