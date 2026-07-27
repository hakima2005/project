import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        libelle: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('type-mts.store'));
    }

    return (
        <AppLayout title="Ajouter un type de montant">

            <div className="max-w-xl bg-white rounded-xl shadow p-6">

                <form onSubmit={submit} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium">
                            Libellé
                        </label>

                        <input
                            type="text"
                            value={data.libelle}
                            onChange={e => setData('libelle', e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.libelle &&
                            <p className="text-red-500 text-sm">
                                {errors.libelle}
                            </p>
                        }
                    </div>
                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Enregistrer
                        </button>

                        <Link
                            href={route('type-mts.index')}
                            className="bg-gray-300 px-5 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}