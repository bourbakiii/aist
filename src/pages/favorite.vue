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
                <TheTitleSmall>Избранное</TheTitleSmall>
            </div>
        </div>

        <div class="container">
            <template v-if="userStore.isAuthenticated === false">
                <AuthorizePlaceholder>
                    <template #message>
                        Чтобы добавлять избранные товары, необходимо войти в свой аккаунт.
                    </template>
                </AuthorizePlaceholder>
            </template>

            <template v-else>
                <template v-if="getFavoritesStatus === 'idle' || getFavoritesStatus === 'pending'">
                    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
                        <ProductCardSkeleton
                            v-for="n in 12"
                            :key="n"
                        />
                    </div>
                </template>

                <template v-else-if="products?.length">
                    <div class="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5">
                        <ProductCard
                            v-for="product in products"
                            :key="product.id"
                            :product="product"
                        />
                    </div>
                </template>

                <NotFound v-else>
                    <template #message>
                        Начните добавлять товары в «Избранное», чтобы увидеть их здесь
                    </template>
                </NotFound>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';
    import headerTitleKey from '~/keys/headerTitleKey';
    import { useUserStore } from '~/stores/UserStore';

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = 'Избранное';

    const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Избранное' }];

    definePageMeta({
        layout: 'inner',
    });

    useSeoMeta({
        title: 'Избранное',
    });

    const userStore = useUserStore();

    const { data: products, status: getFavoritesStatus } = await useAsyncData(
        '',
        () => AistApi.getFavorites(),
        {
            lazy: true,
            server: false,
            immediate: userStore.isAuthenticated,
        }
    );
</script>
