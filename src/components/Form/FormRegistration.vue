<template>
    <form @submit.prevent="submit">
        <div>
            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.name.error"
            >
                <BaseInput
                    v-model="form.name.value"
                    :name="'name'"
                    :placeholder="'ФИО'"
                    :leading-icon="'icon-user'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.name.error }}
                    </div>
                </template>
            </BaseAlertWrapper>

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
                :show="!!form.email.error"
            >
                <BaseInput
                    v-model="form.email.value"
                    :name="'email'"
                    :placeholder="'Email'"
                    :leading-icon="'icon-mail'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.email.error }}
                    </div>
                </template>
            </BaseAlertWrapper>

            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.pass.error"
            >
                <BaseInput
                    v-model="form.pass.value"
                    :name="'password'"
                    :type="'password'"
                    :placeholder="'Пароль'"
                    :leading-icon="'icon-padlock'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.pass.error }}
                    </div>
                </template>
            </BaseAlertWrapper>

            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.passConfirmation.error"
            >
                <BaseInput
                    v-model="form.passConfirmation.value"
                    :name="'password-confirm'"
                    :type="'password'"
                    :placeholder="'Повторите пароль'"
                    :leading-icon="'icon-padlock'"
                />

                <template #message>
                    <div class="truncate">
                        {{ form.passConfirmation.error }}
                    </div>
                </template>
            </BaseAlertWrapper>
        </div>

        <div>
            <BaseAlertWrapper
                :type="'error'"
                :show="!!form.agreement.error"
            >
                <BaseCheckbox v-model="form.agreement.value">
                    <div class="text-sm">
                        Я ознакомлен и принимаю условия
                        <span class="text-sm text-aist-green"> Пользовательского соглашения</span>
                    </div>
                </BaseCheckbox>

                <template #message>
                    <div class="truncate">
                        {{ form.agreement.error }}
                    </div>
                </template>
            </BaseAlertWrapper>
        </div>

        <div class="mt-7">
            <BaseButton
                :is-loading="isLoading"
                :text="'Зарегистрироваться'"
                :is-big="true"
            />
        </div>
    </form>
</template>

<script setup lang="ts">
    const { form, isLoading, register } = useRegistration();

    const emit = defineEmits<{
        registrated: [phone: string, password: string];
    }>();

    async function submit() {
        const result = await register();

        if (typeof result !== 'boolean') {
            return;
        }

        if (result === true) {
            emit('registrated', form.phone.value, form.pass.value);
        }
    }
</script>
