<template>
    <div class="fixed left-0 top-0 z-[35] h-full w-full bg-white pb-[57px]">
        <div class="h-full overflow-y-auto">
            <header
                class="sticky left-0 top-0 z-10 flex min-h-[51px] w-full items-center bg-white py-2 shadow"
            >
                <div class="container">
                    <div class="flex items-center gap-2">
                        <button
                            v-if="props.showBackButton"
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

            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            title: string;
            showBackButton?: boolean;
        }>(),
        {
            showBackButton: false,
        }
    );
    const emit = defineEmits<{
        back: [];
    }>();

    let timer: NodeJS.Timeout | null = null;

    onMounted(() => {
        timer = setTimeout(() => {
            document.body.classList.add('overflow-hidden');
        }, 500);
    });

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer);
        }

        document.body.classList.remove('overflow-hidden');
    });
</script>
