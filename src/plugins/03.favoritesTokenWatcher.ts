import { useFavoritesStore } from '~/stores/FavoriteStore';
import { useUserStore } from '~/stores/UserStore';

export default defineNuxtPlugin(() => {
    const favoritesStore = useFavoritesStore();
    const userStore = useUserStore();

    watch(
        () => userStore.token,
        async () => {
            if (userStore.isAuthenticated) {
                try {
                    await favoritesStore.getFavorites();
                } catch (e) {}
            }
        },
        {
            immediate: true,
        }
    );
});
