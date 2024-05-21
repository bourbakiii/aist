<template>
    <div>
        <template v-if="userStore.isAuthenticated">
            <div class="hidden lg:mb-6 lg:block">
                <div class="container">
                    <BaseBreadcrumbs :links="breadcrumbs" />
                </div>
            </div>

            <PageOrders />
        </template>

        <AuthorizePlaceholder v-else>
            <template #message> Чтобы войти в профиль, необходимо войти в свой аккаунт </template>
        </AuthorizePlaceholder>

        <Teleport to="body">
            <ModalPageAuth v-if="!userStore.isAuthenticated && (isMobile ?? false)" />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';
    import { useUserStore } from '~/stores/UserStore';

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = 'Профиль';

    const breadcrumbs = [{ name: 'Главная', link: '/' }, { name: 'Профиль' }];

    useSchemaOrg([
        defineBreadcrumb({
            itemListElement: breadcrumbs,
        }),
        defineWebPage({
            name: 'Профиль',
        }),
    ]);

    definePageMeta({
        layout: 'inner',
    });

    useSeoMeta({
        title: 'Профиль',
    });

    const { isMobile } = useMobile();

    const userStore = useUserStore();
</script>
