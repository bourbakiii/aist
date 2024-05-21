<template>
    <Transition name="bottom-modal">
        <div
            v-if="props.show"
            @click.self="emit('close')"
            class="bottom-modal fixed left-0 top-0 z-[25] flex h-full w-full flex-col items-stretch justify-end bg-black/60 pb-[57px] pt-[52px]"
        >
            <div class="bottom-modal__container rounded-t-[10px] bg-white pb-9 pt-6">
                <div class="container">
                    <header class="relative mb-6 text-center">
                        <TheTitleSmaller>
                            <slot name="header" />
                        </TheTitleSmaller>

                        <button
                            @click="emit('close')"
                            class="absolute right-0 top-1/2 -translate-y-1/2"
                            type="button"
                        >
                            <i class="icon-cross block text-[24px]"></i>
                        </button>
                    </header>
                </div>

                <div>
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    const props = defineProps<{
        show: boolean;
    }>();

    const emit = defineEmits<{
        close: [];
    }>();

    let timer: NodeJS.Timeout | null = null;

    function checkShow() {
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
        }
    );
</script>
