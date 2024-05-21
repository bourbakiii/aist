<template>
    <div class="flex flex-col items-center text-center">
        <div class="w-full">
            <NuxtImg
                :preload="true"
                src="/images/authorize.svg"
                alt="Nothing found"
                class="mx-auto w-full max-w-[465px]"
            />
        </div>

        <div class="mt-6">
            <div class="mb-4 font-Inter text-[30px] font-bold lg:text-[40px]">
                <slot name="title">Нужно авторизоваться</slot>
            </div>

            <div>
                <slot name="message" />
            </div>

            <div class="mt-6">
                <div class="lg:mx-auto lg:w-[310px]">
                    <BaseButton
                        @click="click"
                        :is-big="true"
                        :to="isMobile ? '/profile' : undefined"
                        :text="'Войти'"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import authorizationModalKey from '~/keys/authorizationModalKey';

    const { isMobile } = useMobile();

    const showAuthModal = inject(authorizationModalKey)!;

    function click() {
        if (isMobile.value) {
            return;
        }

        showAuthModal.value = true;
    }
</script>
