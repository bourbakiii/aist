import { useBasketStore } from '~/stores/BasketStore';
import { useUserStore } from '~/stores/UserStore';

export default defineNuxtPlugin(() => {
    const basketStore = useBasketStore();
    const userStore = useUserStore();

    watch(
        () => userStore.token,
        async () => {
            if (userStore.isAuthenticated) {
                try {
                    await basketStore.getBasket();
                } catch (e) {}
            }
        },
        {
            immediate: true,
        }
    );

    watch(
        () => userStore.token,
        async () => {
            if (userStore.isAuthenticated) {
                await basketStore.mergeBasket();

                return;
            }

            basketStore.basket = [];
        }
    );
});
