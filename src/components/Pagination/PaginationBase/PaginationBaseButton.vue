<template>
    <a
        :class="{
            'bg-aist-green fill-white text-white': props.active,
            'hover:bg-aist-green hover:fill-white hover:text-white focus:bg-aist-green focus:fill-white focus:text-white':
                !props.active,
        }"
        class="relative flex h-11 w-11 items-center justify-center border border-[#556987] font-medium outline-offset-4 transition duration-100 after:pointer-events-none after:absolute after:-left-[1px] after:-top-[1px] after:z-20 after:block after:h-[calc(100%_+_2px)] after:w-[calc(100%_+_2px)] after:transition after:duration-100 focus-visible:z-10 focus-visible:outline-black active:after:bg-white/50 active:after:duration-0"
    >
        <span
            v-if="props.iconClass"
            class="block"
        >
            <i
                :class="[props.iconClass]"
                class="block text-[24px]"
            ></i>
        </span>

        <span v-if="props.text">{{ props.text }}</span>
    </a>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';

    const props = defineProps<{
        iconClass?: IconClass;
        text?: string;
        active?: boolean;
    }>();
</script>
