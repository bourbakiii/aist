import AistApi, { LoginError } from '~/api/AistApi/AistApi';
import type { AlertTypes } from '~/core/constants/AlertTypes';
import { useUserStore } from '~/stores/UserStore';

export default () => {
    const userStore = useUserStore();

    interface FormValue {
        value: string;
        error: string | null;
    }

    const form: {
        phone: FormValue;
        password: FormValue;
    } = reactive({
        phone: {
            value: '',
            error: null,
        },
        password: {
            value: '',
            error: null,
        },
    });

    for (const key in form) {
        if (Object.prototype.hasOwnProperty.call(form, key)) {
            // @ts-ignore
            const element = form[key];

            watch(
                () => element.value,
                () => {
                    element.error = null;
                }
            );
        }
    }

    const rememberMe = ref<boolean>(false);

    const message = ref<string>('');
    const messageType = ref<AlertTypes>('default');

    const isLoading = ref<boolean>(false);

    function clearMessages() {
        for (const key in form) {
            if (Object.prototype.hasOwnProperty.call(form, key)) {
                // @ts-ignore
                const element = form[key];

                element.error = null;
            }
        }

        message.value = '';
        messageType.value = 'default';
    }

    async function auth(): Promise<boolean | void> {
        if (isLoading.value) {
            return;
        }

        clearMessages();

        isLoading.value = true;

        try {
            const token = await AistApi.auth(form.phone.value, form.password.value);

            message.value = 'Успешная авторизация';
            messageType.value = 'success';

            userStore.token = token;
        } catch (e) {
            if (e instanceof LoginError) {
                form.phone.error = e.fieldErrors.login ?? null;
                form.password.error = e.fieldErrors.pass ?? null;
            } else {
                message.value = 'Произошла непредвиденная ошибка! Попробуйте позже.';
                messageType.value = 'error';
            }

            return false;
        } finally {
            isLoading.value = false;
        }

        return true;
    }

    return { form, isLoading, message, messageType, rememberMe, auth };
};
