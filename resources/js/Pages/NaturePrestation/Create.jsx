import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function NaturePrestationCreate({ typesCategories }) {

    const { data, setData, post, processing, errors } = useForm({
        code_nat_prest: '',
        intitule_fr: '',
        intitule_ar: '',
        description: '',
        id_type_categorie: '',
    });

    return (
        <AppLayout title="Nouvelle nature de prestation">

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post('/natures-prestation');
                    }}
                    className="space-y-4"
                >

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Code *
                        </label>

                        <input
                            type="text"
                            value={data.code_nat_prest}
                            onChange={(e) =>
                                setData('code_nat_prest', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />

                        {errors.code_nat_prest && (
                            <p className="text-red-500 text-xs">
                                {errors.code_nat_prest}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Type de catégorie *
                        </label>

                        <select
                            value={data.id_type_categorie}
                            onChange={(e) =>
                                setData('id_type_categorie', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">
                                -- Choisir un type de catégorie --
                            </option>

                            {typesCategories?.map((type) => (
                                <option
                                    key={type.id_type_categorie}
                                    value={type.id_type_categorie}
                                >
                                    {type.libelle}
                                </option>
                            ))}
                        </select>

                        {errors.id_type_categorie && (
                            <p className="text-red-500 text-xs">
                                {errors.id_type_categorie}
                            </p>
                        )}
                    </div>

                    <div>
                        <label>Intitulé FR *</label>

                        <input
                            type="text"
                            value={data.intitule_fr}
                            onChange={(e) =>
                                setData('intitule_fr', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Intitulé AR</label>

                        <input
                            type="text"
                            dir="rtl"
                            value={data.intitule_ar}
                            onChange={(e) =>
                                setData('intitule_ar', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label>Description</label>

                        <textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >
                            Enregistrer
                        </button>

                        <Link
                            href="/natures-prestation"
                            className="bg-gray-200 px-6 py-2 rounded-lg"
                        >
                            Annuler
                        </Link>

                    </div>

                </form>

            </div>

        </AppLayout>
    );
}