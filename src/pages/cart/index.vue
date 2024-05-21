<template>
    <div>
        <div class="hidden lg:mb-6 lg:block">
            <div class="container">
                <BaseBreadcrumbs :links="breadcrumbs" />
            </div>
        </div>

        <div class="container">
            <TheCart v-if="userStore.isAuthenticated" />

            <AuthorizePlaceholder v-else>
                <template #message>
                    Чтобы добавлять товары в корзину и совершать покупки, необходимо войти в свой
                    аккаунт.
                </template>
            </AuthorizePlaceholder>
        </div>
    </div>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';
    import { useUserStore } from '~/stores/UserStore';

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = 'Корзина';

    const breadcrumbs = [
        {
            name: 'Главная',
            item: '/',
        },
        {
            name: 'Корзина',
        },
    ];

    useSchemaOrg([
        defineBreadcrumb({
            itemListElement: breadcrumbs,
        }),
    ]);

    definePageMeta({
        layout: 'inner',
    });

    useSeoMeta({
        title: 'Корзина',
    });

    const userStore = useUserStore();
</script>
