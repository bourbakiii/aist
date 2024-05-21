import AistApi, { RegisterError } from '~/api/AistApi/AistApi';
import type { AlertTypes } from '~/core/constants/AlertTypes';

export default () => {
    interface FormValue {
        value: string;
        error: string | null;
    }

    interface FormValueBoolean {
        value: boolean;
        error: string | null;
    }

    const form: {
        name: FormValue;
        phone: FormValue;
        email: FormValue;
        pass: FormValue;
        passConfirmation: FormValue;
        agreement: FormValueBoolean;
    } = reactive({
        name: {
            value: '',
            error: null,
        },
        phone: {
            value: '',
            error: null,
        },
        email: {
            value: '',
            error: null,
        },
        pass: {
            value: '',
            error: null,
        },
        passConfirmation: {
            value: '',
            error: null,
        },
        agreement: {
            value: false,
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

    async function register(): Promise<boolean | void> {
        if (isLoading.value) {
            return;
        }

        clearMessages();

        isLoading.value = true;

        try {
            await AistApi.register(
                form.name.value,
                form.phone.value,
                form.email.value,
                form.pass.value,
                form.passConfirmation.value,
                form.agreement.value
            );
        } catch (e) {
            if (e instanceof RegisterError) {
                form.name.error = e.fieldErrors.name ?? null;
                form.phone.error = e.fieldErrors.phone ?? null;
                form.email.error = e.fieldErrors.email ?? null;
                form.pass.error = e.fieldErrors.pass ?? null;
                form.agreement.error = e.fieldErrors.agreement ?? null;

                return false;
            }

            message.value = 'Произошла непредвиденная ошибка! Попробуйте позже.';
            messageType.value = 'error';

            return false;
        } finally {
            isLoading.value = false;
        }

        return true;
    }

    return { form, isLoading, register, message, messageType };
};
