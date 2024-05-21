<template>
    <BaseModalMobilePage
        @back="screenSlider!.slideBack()"
        :title="slideTitle"
        :show-back-button="canGoBack"
    >
        <div class="relative pb-9 pt-16">
            <div class="container">
                <div
                    class="mx-auto flex h-[128px] w-[128px] items-center justify-center rounded-full bg-aist-grey-light text-[85px] text-aist-grey"
                >
                    <i class="icon-user block"></i>
                </div>
            </div>

            <div class="mt-9">
                <ScreenSliderWrapper ref="screenSliderWrapper">
                    <ScreenSliderSlide
                        :id="'main'"
                        :title="'Авторизация'"
                    >
                        <div class="container pb-3 pt-3">
                            <FormAuth @want-to-register="screenSlider!.slideTo('register')" />
                        </div>
                    </ScreenSliderSlide>

                    <ScreenSliderSlide
                        :id="'register'"
                        :title="'Регистрация'"
                    >
                        <div class="container pb-3 pt-3">
                            <FormRegistration @registrated="onRegistration" />
                        </div>
                    </ScreenSliderSlide>
                </ScreenSliderWrapper>
            </div>

            <Transition
                appear-active-class="transition duration-100"
                appear-from-class="opacity-0"
                leave-active-class="transition duration-100"
                leave-from-class="opacity-0"
            >
                <div
                    v-if="authIsLoading"
                    class="absolute left-0 top-0 h-full w-full bg-white/50"
                >
                    <div
                        class="absolute left-1/2 top-1/2 block h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                    >
                        <BaseLoading />
                    </div>
                </div>
            </Transition>
        </div>
    </BaseModalMobilePage>
</template>

<script setup lang="ts">
    import ScreenSlider from '~/utils/ScreenSlider/ScreenSlider';
    import type { ScreenSliderWrapper } from '#components';

    const slideTitle = ref<string>('Авторизация');
    const canGoBack = ref<boolean>(false);

    let screenSlider: ScreenSlider | null = null;
    const screenSliderWrapper = ref<InstanceType<typeof ScreenSliderWrapper> | null>(null);

    onMounted(() => {
        screenSlider = new ScreenSlider(screenSliderWrapper.value!.$el, {
            onScreenChange: () => {
                slideTitle.value = screenSlider!.currentSlide.title ?? '';
                canGoBack.value = screenSlider!.canGoBack;
            },
        });
    });

    const { form, auth, isLoading: authIsLoading } = useAuthorization();

    async function onRegistration(phone: string, password: string) {
        form.phone.value = phone;
        form.password.value = password;

        await auth();
    }
</script>
