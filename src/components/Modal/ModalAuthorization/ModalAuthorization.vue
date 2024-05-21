<template>
    <div class="relative">
        <div>
            <BaseButtonIcon
                :to="userStore.isAuthenticated ? '/profile' : undefined"
                @click="!userStore.isAuthenticated ? (show = !show) : undefined"
                :icon-class="'icon-user'"
                :is-outlined="true"
                aria-label="Личный кабинет"
            />
        </div>

        <Transition
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 -translate-y-[10px]"
            leave-active-class="transition duration-200"
            leave-to-class="opacity-0 -translate-y-[10px]"
        >
            <ModalAuthorizationModal
                v-if="show"
                @close="show = false"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '~/stores/UserStore';
    import authorizationModalKey from '~/keys/authorizationModalKey';

    const userStore = useUserStore();

    const show = inject(authorizationModalKey);
</script>
