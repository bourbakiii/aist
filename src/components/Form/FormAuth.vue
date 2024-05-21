<template>
    <form @submit.prevent="submit">
        <div>
            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.phone.error"
            >
                <BaseInput
                    v-model="form.phone.value"
                    :name="'tel'"
                    :placeholder="'Номер телефона'"
                    :mask="{
                        mask: '+{7}(000)000-00-00',
                    }"
                    :leading-icon="'icon-phone'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.phone.error }}
                    </div>
                </template>
            </BaseAlertWrapper>

            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.password.error"
            >
                <BaseInput
                    v-model="form.password.value"
                    :name="'password'"
                    :type="'password'"
                    :placeholder="'Пароль'"
                    :leading-icon="'icon-padlock'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.password.error }}
                    </div>
                </template>
            </BaseAlertWrapper>
        </div>

        <div class="flex items-start justify-between gap-3">
            <div class="w-[160px]">
                <BaseCheckbox v-model="rememberMe">
                    <span class="text-sm"> Запомнить меня </span>
                </BaseCheckbox>
            </div>

            <div>
                <button
                    class="text-sm font-semibold text-aist-green hover:underline focus:underline"
                >
                    Забыли пароль?
                </button>
            </div>
        </div>

        <div class="mt-9">
            <BaseButton
                :text="'Войти'"
                :is-loading="isLoading"
                :is-big="true"
            />

            <div class="mt-6 text-center text-sm">
                <span> Ещё нет аккаунта? </span>

                <button
                    @click="emit('wantToRegister')"
                    type="button"
                    class="font-semibold text-aist-green hover:underline focus:underline"
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    const emit = defineEmits<{
        wantToRegister: [];
        loggedIn: [];
    }>();

    const { form, rememberMe, auth, isLoading } = useAuthorization();

    async function submit() {
        const result = await auth();

        if (typeof result !== 'boolean') {
            return;
        }

        if (result === true) {
            emit('loggedIn');
        }
    }
</script>
