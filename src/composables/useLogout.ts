import AistApi from '~/api/AistApi/AistApi';
import type { AlertTypes } from '~/core/constants/AlertTypes';
import { useUserStore } from '~/stores/UserStore';

export default () => {
    const message = ref('');
    const messageType = ref<AlertTypes>('default');

    const isPending = ref<boolean>(false);

    function clearMessages() {
        message.value = '';
        messageType.value = 'default';
    }

    const userStore = useUserStore();

    const router = useRouter();

    async function logout() {
        if (isPending.value) {
            return;
        }

        isPending.value = true;

        clearMessages();

        try {
            await AistApi.logout();
        } catch (e) {
            message.value = 'Что-то пошло не так! Попробуйте позже.';
            messageType.value = 'error';
        } finally {
            await router.push('/');

            userStore.logout();

            isPending.value = false;
        }
    }

    return { message, messageType, isPending, logout };
};
