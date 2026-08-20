import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    50:  '#EEF2F6',
                    100: '#D7E0EA',
                    200: '#AFC1D5',
                    300: '#7E9BBB',
                    400: '#4E749F',
                    500: '#2E5580',
                    600: '#1C3E63',
                    700: '#16385F',
                    800: '#0F2A4A',
                    900: '#091B30',
                },
                gold: {
                    50:  '#FBF6EC',
                    100: '#F3E5C4',
                    200: '#E6CB8B',
                    300: '#D4AF5C',
                    400: '#C29A3E',
                    500: '#B8862E',
                    600: '#9A6F26',
                    700: '#7C591F',
                },
                cream: {
                    50:  '#FBFAF8',
                    100: '#F7F6F3',
                    200: '#EFECE5',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Lora', 'Georgia', 'serif'],
            },
            boxShadow: {
                card: '0 1px 3px rgba(15, 42, 74, 0.08), 0 1px 2px rgba(15, 42, 74, 0.06)',
                'card-hover': '0 4px 12px rgba(15, 42, 74, 0.12)',
            },
        },
    },
    plugins: [forms],
};