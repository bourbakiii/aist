<template>
    <div
        :class="{ 'pb-6': props.absolute }"
        class="relative"
    >
        <div>
            <slot />
        </div>

        <Transition
            enter-active-class="transition duration-[250ms] ease-out"
            enter-from-class="-translate-y-[5px] opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-[75ms] ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-[5px] opacity-0"
        >
            <div
                v-if="props.show"
                :class="{
                    '!text-aist-red': props.type === 'error',
                    'absolute bottom-[4px] left-0': props.absolute,
                }"
                class="w-full animate-[wiggle_400ms_ease] text-xs"
            >
                <slot name="message" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import type { AlertTypes } from '~/core/constants/AlertTypes';

    const props = withDefaults(
        defineProps<{
            type: AlertTypes;
            show?: boolean;
            absolute?: boolean;
        }>(),
        {
            absolute: true,
        }
    );
</script>
