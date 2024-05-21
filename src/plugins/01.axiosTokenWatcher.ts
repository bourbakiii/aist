import AxiosInstance from '~/axios';
import { useUserStore } from '~/stores/UserStore';

export default defineNuxtPlugin(() => {
    const userStore = useUserStore();

    watch(
        () => userStore.token,
        () => {
            if (userStore.token) {
                AxiosInstance.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${userStore.token}`;

                return;
            }

            delete AxiosInstance.defaults.headers.common['Authorization'];
        },
        {
            immediate: true,
        }
    );
});
