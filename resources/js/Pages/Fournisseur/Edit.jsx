import AppLayout from '@/Layouts/AppLayout';
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
            <div className="max-w-3xl bg-white rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Modifier le fournisseur
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium">
                            Raison sociale
                        </label>
                        <input
                            type="text"
                            value={data.raison_sociale}
                            onChange={(e) => setData('raison_sociale', e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                        {errors.raison_sociale &&
                            <div className="text-red-500 text-sm">
                                {errors.raison_sociale}
                            </div>
                        }
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Adresse
                        </label>
                        <input
                            type="text"
                            value={data.adresse}
                            onChange={(e) => setData('adresse', e.target.value)}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-medium">
                                Téléphone
                            </label>
                            <input
                                type="text"
                                value={data.telephone}
                                onChange={(e) => setData('telephone', e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                            {errors.email &&
                                <div className="text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            }
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-1 font-medium">
                                IF
                            </label>
                            <input
                                type="text"
                                value={data.if}
                                onChange={(e) => setData('if', e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                ICE
                            </label>
                            <input
                                type="text"
                                value={data.ice}
                                onChange={(e) => setData('ice', e.target.value)}
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                    </div>

                    <div className="flex gap-3 pt-4">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            {processing ? "Enregistrement..." : "Mettre à jour"}
                        </button>

                        <Link
                            href="/fournisseurs"
                            className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>
        </AppLayout>
    );
}