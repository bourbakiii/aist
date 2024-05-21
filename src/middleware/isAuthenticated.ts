import { useUserStore } from '~/stores/UserStore';

export default defineNuxtRouteMiddleware(() => {
    const userStore = useUserStore();

    if (!userStore.isAuthenticated) {
        return abortNavigation();
    }
});
