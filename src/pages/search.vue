<template>
    <div>
        <Meta
            name="robots"
            content="noindex"
        />

        <div class="hidden lg:mb-6 lg:block">
            <div class="container">
                <BaseBreadcrumbs :links="breadcrumbs" />
            </div>
        </div>

        <div class="container hidden lg:block">
            <div class="mb-9">
                <TheTitleSmall>{{ searchParam }}</TheTitleSmall>
            </div>
        </div>

        <div class="container">
            <template v-if="status === 'idle' || status === 'pending'">
                <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
                    <ProductCardSkeleton
                        v-for="n in 12"
                        :key="n"
                    />
                </div>
            </template>

            <template v-else-if="products.length">
                <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
                    <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :product="product"
                    />
                </div>
            </template>

            <div v-else>
                <NotFound>
                    <template #title>Ничего не найдено</template>

                    <template #message>
                        По вашему запросу <b>"{{ searchParam }}"</b> ничего не найдено
                    </template>
                </NotFound>
            </div>

            <div
                v-if="lastPage && page <= lastPage && lastPage > 1"
                class="mt-6"
            >
                <ThePagination
                    v-model="page"
                    :last-page="lastPage"
                    :is-loading="status === 'pending'"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';

    const route = useRoute();

    const searchParam = computed(() => {
        if (Array.isArray(route.query.search)) {
            return String(route.query.search[0]);
        }

        return String(route.query.search);
    });

    const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: searchParam.value }];

    definePageMeta({
        layout: 'inner',
    });

    useSeoMeta({
        title: searchParam.value,
    });

    const router = useRouter();

    const page = computed({
        get() {
            return Number(route.query.page ?? 1);
        },

        set(value) {
            if (status.value === 'pending') {
                return;
            }

            router.push({ query: { ...route.query, page: value } });
        },
    });

    const { data, status } = await useAsyncData(
        '',
        () => AistApi.search(searchParam.value, page.value, 12),
        {
            server: false,
            lazy: true,
            watch: [searchParam, page],
        }
    );

    const products = computed(() => {
        return data.value?.[0] ?? [];
    });

    const lastPage = computed(() => {
        return data.value?.[1];
    });
</script>
