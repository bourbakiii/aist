<template>
    <div
        class="absolute right-[-5.7rem] top-[87px] w-[380px] rounded-[10px] bg-white px-[36px] pb-[48px] pt-[64px] shadow-aist"
    >
        <div
            class="solid absolute right-[80px] top-[-25px] h-0 w-0 rounded-[10px] border-[0px] border-b-[30px] border-l-[30px] border-r-[30px] border-transparent border-b-white"
        ></div>

        <ScreenSliderWrapper
            ref="screenSliderWrapper"
            class="-mx-[36px]"
        >
            <ScreenSliderSlide :id="'main'">
                <div class="px-[36px] pb-3 pt-3">
                    <div>
                        <div class="mb-9 flex items-center justify-center gap-4">
                            <TheTitleSmaller>Авторизация</TheTitleSmaller>
                        </div>
                    </div>

                    <FormAuth
                        @logged-in="onAuth"
                        @want-to-register="screenSlider!.slideTo('register')"
                    />
                </div>
            </ScreenSliderSlide>

            <ScreenSliderSlide :id="'register'">
                <div class="px-[36px] pb-3 pt-3">
                    <div>
                        <div class="mb-9 flex items-center justify-center gap-4">
                            <TheTitleSmaller>Регистрация</TheTitleSmaller>
                        </div>
                    </div>

                    <FormRegistration @registrated="onRegistration" />
                </div>
            </ScreenSliderSlide>
        </ScreenSliderWrapper>

        <Transition
            appear-active-class="transition duration-100"
            appear-from-class="opacity-0"
            leave-active-class="transition duration-100"
            leave-from-class="opacity-0"
        >
            <div
                v-if="authIsLoading"
                class="absolute left-0 top-0 h-full w-full rounded-[10px] bg-white/50"
            >
                <div
                    class="absolute left-1/2 top-1/2 block h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                >
                    <BaseLoading />
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import ScreenSlider from '~/utils/ScreenSlider/ScreenSlider';
    import type { ScreenSliderWrapper } from '#components';

    const emit = defineEmits<{
        close: [];
    }>();

    const screenSliderWrapper = ref<InstanceType<typeof ScreenSliderWrapper> | null>(null);
    let screenSlider: ScreenSlider | null = null;

    onMounted(() => {
        screenSlider = new ScreenSlider(screenSliderWrapper.value!.$el, {});
    });

    const { form, auth, isLoading: authIsLoading } = useAuthorization();

    async function onRegistration(phone: string, password: string) {
        form.phone.value = phone;
        form.password.value = password;

        await auth();

        onAuth();
    }

    const router = useRouter();

    function onAuth() {
        router.push('/profile');
        emit('close');
    }
</script>
