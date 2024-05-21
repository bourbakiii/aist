// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: './src/',
    devtools: { enabled: false },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ['@nuxt/image', '@pinia/nuxt', 'nuxt-schema-org', 'nuxt-site-config'],
    site: {
        url: 'http://127.0.0.1:3000',
        name: 'Aist Marketplace',
        defaultLocale: 'ru',
    },
    image: {
        quality: 50,
        domains: ['admin.aist.abetadev.beget.tech'],
    },
    css: ['@/assets/styles/main.css'],
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
        },
    },
    runtimeConfig: {
        public: {
            dadataToken: 'f52220b7342bf11febc40beb082eb2a4ffccf488',
            placeholderImageSrc: '/images/placeholder-image.jpg',
        },
    },
    nitro: {
        compressPublicAssets: true,
    },
});
