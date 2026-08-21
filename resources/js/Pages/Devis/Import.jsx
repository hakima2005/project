import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { Link, useForm } from '@inertiajs/react';
import { FileUp, FileText, X } from 'lucide-react';

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
            <div className="max-w-2xl">

                <Card>

                    <div className="flex items-start gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center shrink-0">
                            <FileUp size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-display text-lg font-semibold text-navy-900">
                                Importer un devis fournisseur
                            </h2>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Le document sera analysé automatiquement par le module ETL.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={submit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Document du fournisseur
                            </label>

                            <label
                                htmlFor="document-upload"
                                className={`flex flex-col items-center justify-center gap-2
                                border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer
                                transition-colors
                                ${data.document
                                    ? 'border-navy-300 bg-navy-50'
                                    : 'border-gray-300 hover:border-gold-400 hover:bg-gold-50'
                                }`}
                            >
                                {data.document ? (
                                    <>
                                        <FileText size={28} className="text-navy-700" />
                                        <span className="text-sm font-medium text-navy-800">
                                            {data.document.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setData('document', null);
                                            }}
                                            className="mt-1 inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700"
                                        >
                                            <X size={13} /> Retirer le fichier
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <FileUp size={28} className="text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            Cliquer pour choisir un fichier PDF
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            PDF uniquement
                                        </span>
                                    </>
                                )}

                                <input
                                    id="document-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setData(
                                            'document',
                                            e.target.files[0]
                                        )
                                    }
                                    className="hidden"
                                />
                            </label>

                            {errors.document && (
                                <p className="text-rose-500 text-sm mt-2">
                                    {errors.document}
                                </p>
                            )}
                        </div>

                        {progress && (
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Importation en cours...</span>
                                    <span>{progress.percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gold-500 transition-all"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={
                                    processing ||
                                    !data.document
                                }
                            >
                                {processing
                                    ? 'Analyse du document...'
                                    : 'Importer le document'}
                            </Button>

                            <Button
                                as={Link}
                                href={route('devis.index')}
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
