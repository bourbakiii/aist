const plugin = require('tailwindcss/plugin');

/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
        fontFamily: {
            Inter: ['Inter', 'sans-serif'],
            OpenSans: ['Open Sans', 'sans-serif'],
        },
        extend: {
            colors: {
                'aist-green': '#55A630',
                'aist-green-light': '#55A63066',
                'aist-black': '#1A1D1F',
                'aist-black-light': '#1A1D1F66',
                'aist-white': '#FAFAFA',
                'aist-grey': '#9EA5AD',
                'aist-grey-light': '#EBEBF0',
                'aist-red': '#F04122',
            },
            boxShadow: {
                aist: '0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(103, 110, 118, 0.16), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-10px)' },
                    '50%': { transform: 'translateX(10px)' },
                    '75%': { transform: 'translateX(-10px)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function ({ addBase }) {
            addBase({
                '[type="search"]::-webkit-search-decoration': { display: 'none' },
                '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
                '[type="search"]::-webkit-search-results-button': { display: 'none' },
                '[type="search"]::-webkit-search-results-decoration': { display: 'none' },
            });
        }),
    ],
};
