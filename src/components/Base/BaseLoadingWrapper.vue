<template>
    <div class="relative">
        <slot />

        <Transition
            appear-active-class="transition duration-100"
            appear-from-class="opacity-0"
            leave-active-class="transition duration-100"
            leave-from-class="opacity-0"
        >
            <div
                v-if="props.show"
                class="absolute left-0 top-0 z-10 h-full w-full rounded-[10px] bg-aist-white/50"
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
    const props = defineProps<{
        show: boolean;
    }>();
</script>
