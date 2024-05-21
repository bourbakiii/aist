<template>
    <Transition name="modal">
        <div
            v-if="props.show"
            @click.self="emit('back')"
            class="modal fixed left-0 top-0 z-[35] h-full w-full bg-white pb-[57px] lg:z-[25] lg:flex lg:items-start lg:justify-center lg:bg-black/60 lg:pb-0 lg:pt-[90px]"
        >
            <div
                class="modal__container h-full overflow-y-scroll lg:relative lg:mt-[120px] lg:h-auto lg:max-h-[calc(100vh_-_90px_-_120px_-_40px)] lg:w-[506px] lg:rounded-[10px] lg:bg-white lg:px-9 lg:pb-10 lg:pt-9"
            >
                <header
                    class="sticky left-0 top-0 z-10 flex min-h-[51px] w-full items-center bg-white py-2 shadow lg:hidden"
                >
                    <div class="container">
                        <div class="flex items-center gap-2">
                            <button
                                @click="emit('back')"
                                class="h-[24px] w-[24px] flex-none text-[24px]"
                            >
                                <i class="icon-chevron-left block"></i>
                            </button>

                            <div class="flex-1 font-Inter text-[24px] font-bold">
                                {{ props.title }}
                            </div>
                        </div>
                    </div>
                </header>

                <header class="hidden lg:block">
                    <div class="mb-9 text-center font-Inter text-3xl font-bold">
                        {{ props.title }}
                    </div>
                </header>

                <button
                    @click="emit('back')"
                    class="absolute right-[36px] top-[42px] hidden text-[24px] text-aist-grey hover:text-aist-black focus:text-aist-black lg:block"
                >
                    <i
                        :class="[closeIconClass]"
                        class="block"
                    ></i>
                </button>

                <div class="mt-6 lg:mt-0">
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';

    const props = defineProps<{
        title: string;
        show: boolean;
    }>();

    const emit = defineEmits<{
        back: [];
    }>();

    const closeIconClass: IconClass = 'icon-cross';

    let timer: NodeJS.Timeout | null = null;

    function checkShow() {
        if (typeof document === 'undefined') {
            return;
        }

        if (timer) {
            clearTimeout(timer);
        }

        if (props.show) {
            timer = setTimeout(() => {
                document.body.classList.add('overflow-hidden');
            }, 500);
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    onMounted(() => {
        checkShow();
    });

    onUnmounted(() => {
        checkShow();

        if (timer) {
            clearTimeout(timer);
        }
    });

    watch(
        () => props.show,
        () => {
            checkShow();
        },
        {
            immediate: true,
        }
    );
</script>
