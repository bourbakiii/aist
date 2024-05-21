<template>
    <PageOrder v-if="userStore.isAuthenticated" />

    <AuthorizePlaceholder v-else>
        <template #message>Чтобы войти в профиль, необходимо войти в свой аккаунт</template>
    </AuthorizePlaceholder>
</template>

<script setup lang="ts">
    import { useUserStore } from '~/stores/UserStore';

    definePageMeta({
        layout: 'inner',
        middleware: ['is-authenticated'],
    });

    const userStore = useUserStore();
</script>
