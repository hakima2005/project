import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ fournisseur }) {
    const { data, setData, put, processing, errors } = useForm({
        raison_sociale: fournisseur.raison_sociale || '',
        adresse: fournisseur.adresse || '',
        telephone: fournisseur.telephone || '',
        email: fournisseur.email || '',
        if: fournisseur.if || '',
        ice: fournisseur.ice || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/fournisseurs/${fournisseur.id_fournisseur}`);
    };

    return (
        <AppLayout title="Modifier fournisseur">
            <div className="max-w-3xl">
                <Card title="Modifier le fournisseur">

                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Raison sociale
                            </label>
                            <input
                                type="text"
                                value={data.raison_sociale}
                                onChange={(e) => setData('raison_sociale', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                            {errors.raison_sociale &&
                                <div className="text-rose-500 text-xs mt-1">
                                    {errors.raison_sociale}
                                </div>
                            }
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                                Adresse
                            </label>
                            <input
                                type="text"
                                value={data.adresse}
                                onChange={(e) => setData('adresse', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="text"
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                                {errors.email &&
                                    <div className="text-rose-500 text-xs mt-1">
                                        {errors.email}
                                    </div>
                                }
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    IF
                                </label>
                                <input
                                    type="text"
                                    value={data.if}
                                    onChange={(e) => setData('if', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    ICE
                                </label>
                                <input
                                    type="text"
                                    value={data.ice}
                                    onChange={(e) => setData('ice', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"
                                />
                            </div>

                        </div>

                        <div className="flex gap-3 pt-4">

                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? "Enregistrement..." : "Mettre à jour"}
                            </Button>

                            <Button as={Link} href="/fournisseurs" variant="secondary">
                                Annuler
                            </Button>

                        </div>

                    </form>

                </Card>
            </div>
        </AppLayout>
    );
}
