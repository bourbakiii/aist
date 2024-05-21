<template>
    <button
        @click="buttonClick"
        :aria-label="props.ariaLabel"
        :class="{
            'border-aist-red': active,
            'border-none': props.borderNone,
            '!h-[46px] !w-[46px]': props.isBig,
        }"
        class="relative block h-[36px] w-[36px] rounded-full border-2 border-aist-grey bg-white text-[20px] outline-none transition duration-[300ms] hover:border-aist-red focus:border-aist-red focus-visible:border-aist-red focus-visible:ring focus-visible:ring-aist-red/50"
    >
        <i
            :class="{ '!scale-0 !opacity-0': active }"
            class="icon-heart pointer-events-none absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 scale-100 text-aist-grey transition duration-300"
        ></i>

        <i
            :class="{ '!scale-100 !opacity-100': active }"
            class="icon-heart-filled pointer-events-none absolute left-1/2 top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 scale-0 text-aist-red opacity-0 transition duration-[400ms] ease-[cubic-bezier(0.64,_0.57,_0.67,_1.70)]"
        ></i>
    </button>

    <Teleport to="body">
        <BaseModal
            @close="showModal = false"
            :show="showModal"
            :title="'Избранное'"
        >
            <div>Для того чтобы добавить избранные товары, необходимо авторизоваться.</div>

            <div class="mt-6">
                <BaseButton
                    :text="'Авторизоваться'"
                    :to="'/profile'"
                />
            </div>
        </BaseModal>
    </Teleport>
</template>

<script setup lang="ts">
    import type { Product } from '~/api/AistApi/models/Product';
    import { useFavoritesStore } from '~/stores/FavoriteStore';
    import { useUserStore } from '~/stores/UserStore';

    const props = defineProps<{
        product: Product;
        borderNone?: boolean;
        ariaLabel?: string;
        isBig?: boolean;
    }>();

    const userStore = useUserStore();
    const favoriteStore = useFavoritesStore();

    function buttonClick() {
        if (userStore.isAuthenticated) {
            favoriteStore.toggleProductFavorite(props.product);

            return;
        }

        showModal.value = true;
    }

    const active = computed(() => {
        return favoriteStore.favorites.findIndex((p) => p.id === props.product.id) !== -1;
    });

    const showModal = ref(false);
</script>
