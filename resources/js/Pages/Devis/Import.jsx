import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';

export default function DevisImport({ errors = {} }) {

    const {
        data,
        setData,
        post,
        processing,
        progress,
    } = useForm({
        document: null,
    });

    const submit = (e) => {

        e.preventDefault();

        post(route('devis.import-document'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout title="Importer un devis">

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Importer un devis fournisseur
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    Le document sera analysé automatiquement par le module ETL.
                </p>

                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Document du fournisseur
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                                setData(
                                    'document',
                                    e.target.files[0]
                                )
                            }
                            className="w-full border border-gray-400 rounded-lg px-3 py-2"
                        />

                        {errors.document && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.document}
                            </p>
                        )}

                    </div>

                    {progress && (
                        <div className="text-sm text-gray-500">
                            Importation : {progress.percentage}%
                        </div>
                    )}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={
                                processing ||
                                !data.document
                            }
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing
                                ? 'Analyse du document...'
                                : 'Importer le document'}
                        </button>

                        <Link
                            href={route('devis.index')}
                            className="bg-gray-200 px-5 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}