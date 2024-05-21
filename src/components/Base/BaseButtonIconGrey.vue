<template>
    <component
        :is="props.to ? NuxtLink : 'button'"
        :to="props.to"
        class="relative flex h-[24px] w-[24px] items-center justify-center rounded-full bg-aist-grey-light text-[20px] text-aist-grey transition duration-100 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:transition after:duration-100 hover:bg-aist-green hover:text-white focus:bg-aist-green focus:text-white [&:not(:disabled)]:active:after:bg-white/40 [&:not(:disabled)]:active:after:duration-0"
    >
        <i class="icon-chevron-right"></i>
    </component>
</template>

<script setup lang="ts">
    import { NuxtLink } from '#components';

    const props = defineProps<{
        to?: string;
    }>();
</script>
