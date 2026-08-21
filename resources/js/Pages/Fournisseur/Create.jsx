import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { useForm, Link } from '@inertiajs/react';

export default function FournisseurCreate() {
    const { data, setData, post, processing, errors } = useForm({
        raison_sociale: '', identifiant_fiscal: '', ICE: '', RC: '', CNSS: '',
        telephone: '', email: '', representation: '', activite_principale: '',
    });
    return (
        <AppLayout title="Nouveau fournisseur">
            <div className="max-w-3xl">
                <Card title="Nouveau fournisseur">
                    <form onSubmit={(e) => { e.preventDefault(); post('/fournisseurs'); }} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Raison sociale *</label>
                            <input type="text" value={data.raison_sociale} onChange={e => setData('raison_sociale', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            {errors.raison_sociale && <p className="text-rose-500 text-xs mt-1">{errors.raison_sociale}</p>}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ICE</label>
                                <input type="text" value={data.ICE} onChange={e => setData('ICE', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IF</label>
                                <input type="text" value={data.identifiant_fiscal} onChange={e => setData('identifiant_fiscal', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">RC</label>
                                <input type="text" value={data.RC} onChange={e => setData('RC', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400"/>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer'}
                            </Button>
                            <Button as={Link} href="/fournisseurs" variant="secondary">Annuler</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
