<template>
    <Transition
        name="base-modal"
        @before-enter="toggleScroll"
        @before-leave="toggleScroll"
    >
        <div
            v-if="props.show"
            @click.self="close"
            class="base-modal fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/40 py-3 md:p-3"
        >
            <div
                :class="{
                    'max-w-[370px]': props.smallSize,
                    'max-w-[992px]': props.video,
                    'max-w-[480px]': !props.smallSize && !props.video,
                }"
                class="base-modal__container flex max-h-full w-full flex-col overflow-y-auto overflow-x-hidden rounded-md bg-white"
            >
                <div
                    v-if="props.title"
                    class="relative flex-none bg-aist-green px-3 py-6 text-white lg:px-6 lg:py-8"
                >
                    <div class="text-center text-xl font-semibold lg:text-3xl">
                        {{ props.title }}
                    </div>

                    <div
                        v-if="props.subtitle"
                        class="mt-3 text-center text-sm lg:text-base"
                    >
                        {{ props.subtitle }}
                    </div>
                </div>

                <div class="overflow-y-auto overflow-x-hidden px-3 py-6 lg:px-6 lg:py-10">
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    const props = defineProps<{
        show: boolean;
        title?: string;
        subtitle?: string;
        smallSize?: boolean;
        video?: boolean;
    }>();

    const emit = defineEmits(['close']);

    function close() {
        emit('close');
    }

    function toggleScroll() {
        document.body.classList.toggle('overflow-hidden');
    }
</script>
