<template>
    <component
        :is="props.to ? NuxtLink : 'button'"
        :to="props.to"
        :class="{
            'h-[46px] w-[46px]': props.isBig,
            'h-[36px] w-[36px]': !props.isBig,
            'border-aist-green bg-transparent text-aist-green hover:bg-aist-green hover:text-white focus:bg-aist-green focus:text-white':
                props.isOutlined,
            'border-transparent bg-aist-green text-white': !props.isOutlined,
        }"
        :disabled="props.disabled"
        class="relative flex items-center justify-center rounded-[10px] border-2 text-[20px] outline-none transition duration-100 after:absolute after:-left-[2px] after:-top-[2px] after:block after:h-[calc(100%_+_4px)] after:w-[calc(100%_+_4px)] after:rounded-[10px] after:transition after:duration-100 hover:after:bg-white/20 focus:after:bg-white/30 focus-visible:ring focus-visible:ring-aist-green-light [&:disabled]:pointer-events-none [&:disabled]:opacity-50 [&:not(:disabled)]:active:after:bg-white/40 [&:not(:disabled)]:active:after:duration-0"
    >
        <i
            :class="[props.iconClass]"
            class="block"
        ></i>
    </component>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';
    import { NuxtLink } from '#components';

    const props = withDefaults(
        defineProps<{
            iconClass: IconClass;
            disabled?: boolean;
            isOutlined?: boolean;
            isBig?: boolean;
            to?: string;
        }>(),
        {
            isOutlined: false,
            isBig: false,
        }
    );
</script>
