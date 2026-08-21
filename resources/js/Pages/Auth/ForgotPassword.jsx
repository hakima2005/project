import InputError from '@/Components/InputError';
import Button from '@/Components/ui/Button';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié" />

            <h2 className="font-display text-lg font-semibold text-navy-900 mb-3">
                Mot de passe oublié
            </h2>

            <div className="mb-4 text-sm text-gray-600">
                Aucun problème. Indiquez votre adresse email et nous vous
                enverrons un lien pour réinitialiser votre mot de passe.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <Button type="submit" variant="primary" disabled={processing}>
                        Envoyer le lien
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}