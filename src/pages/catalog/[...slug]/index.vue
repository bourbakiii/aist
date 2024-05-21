<template>
    <div>
        <PageCatalogProduct
            v-if="isProduct(sectionOrProduct)"
            :product="sectionOrProduct"
            :breadcrumbs="breadcrumbs"
        />

        <PageCatalogSection
            v-else
            :section="sectionOrProduct"
            :breadcrumbs="breadcrumbs"
        />
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';
    import type { Product } from '~/api/AistApi/models/Product';
    import type { Section } from '~/api/AistApi/models/Section';
    import type { Breadcrumbs } from '~/api/AistApi/models/Breadcrumbs';

    definePageMeta({
        layout: 'inner',
    });

    const route = useRoute();

    const paramsSlugs = computed(() => {
        if (Array.isArray(route.params.slug)) {
            return route.params.slug;
        }

        return [route.params.slug];
    });

    const nuxtApp = useNuxtApp();

    const { data } = await useAsyncData<[Section, Breadcrumbs] | [Product, Breadcrumbs]>(
        `catalog-${paramsSlugs.value.concat('-')}`,
        () => AistApi.getSectionOrProduct(...paramsSlugs.value),
        {
            getCachedData(key) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            },
        }
    );

    if (data.value === null) {
        throw createError({ statusCode: 404, statusMessage: 'Section or Product not found' });
    }

    const sectionOrProduct = computed(() => {
        return data.value![0];
    });

    const breadcrumbs = computed(() => {
        return data.value![1];
    });

    function isProduct(sectionOrProduct: any): sectionOrProduct is Product {
        return (sectionOrProduct as Product).price !== undefined;
    }
</script>
