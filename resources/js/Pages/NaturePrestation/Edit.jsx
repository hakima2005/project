import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';

export default function NaturePrestationEdit({ nature, typesCategories }) {

    const { data, setData, put, processing, errors } = useForm({
        intitule_fr: nature.intitule_fr,
        intitule_ar: nature.intitule_ar || '',
        description: nature.description || '',
        id_type_categorie: nature.id_type_categorie || '',
    });

    return (
        <AppLayout title="Modifier nature de prestation">

            <div className="max-w-2xl bg-white rounded-xl shadow p-6">

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(`/natures-prestation/${nature.code_nat_prest}`);
                    }}
                    className="space-y-4"
                >

                    <div>
                        <label>Code</label>

                        <input
                            value={nature.code_nat_prest}
                            disabled
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        />
                    </div>

                    <div>
                        <label>Type de catégorie *</label>

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
                        <label>Intitulé FR</label>

                        <input
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
                            Mettre à jour
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