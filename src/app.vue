<template>
    <NuxtLoadingIndicator color="#55A630" />

    <TheHead />

    <NuxtLayout class="flex min-h-screen flex-col">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';

    const headerTitle = ref('');

    provide(headerTitleKey, headerTitle);

    const appConfig = useAppConfig();

    useSchemaOrg([
        defineLocalBusiness({
            // TODO: Исправить на наши данные
            name: "Harlan's Hamburgers",
            address: {
                streetAddress: '123 Main St',
                addressLocality: 'Harlan',
                addressRegion: 'MA',
                postalCode: '01234',
                addressCountry: 'US',
            },
            image: 'https://emojiguide.org/images/emoji/n/3ep4zx1jztp0n.png',
        }),
        defineWebSite({
            name: 'Aist Marketplace',
        }),
        defineWebPage(),
    ]);

    useSeoMeta({
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} · ${appConfig.title}` : appConfig.title;
        },
    });
</script>
