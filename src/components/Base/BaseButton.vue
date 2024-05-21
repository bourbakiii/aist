<template>
    <component
        :is="props.to ? NuxtLink : 'button'"
        :to="props.to"
        :class="{
            'bg-transparent fill-aist-red text-aist-red hover:bg-aist-red/20 focus:bg-aist-red/20 active:bg-aist-red/30':
                props.isRedOutlined,
            'bg-transparent fill-aist-green text-aist-green hover:bg-aist-green/20 focus:bg-aist-green/20 active:bg-aist-green/30':
                props.isOutlined,
            'bg-aist-black fill-white text-white': props.isBlack,
            'bg-aist-green fill-white text-white':
                !props.isBlack && !props.isOutlined && !props.isRedOutlined,
            'after:pointer-events-none after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:rounded-[10px] after:transition after:duration-100 hover:after:bg-white/20 focus:after:bg-white/30 focus-visible:ring focus-visible:ring-aist-green-light [&:disabled]:pointer-events-none [&:disabled]:opacity-50 [&:not(:disabled)]:active:after:bg-white/40 [&:not(:disabled)]:active:after:duration-0':
                !props.isOutlined && !props.isRedOutlined,
            '!h-[46px]': props.isBig,
        }"
        class="relative flex h-9 w-full items-center justify-center rounded-[10px] px-5 font-semibold outline-none"
    >
        <i
            v-if="props.leadingIcon"
            :class="[props.leadingIcon, props.isLoading ? 'opacity-0' : '']"
            class="mr-2 block text-[20px] transition duration-200"
        ></i>

        <span
            :class="{ 'opacity-0': props.isLoading }"
            class="truncate text-center transition duration-200"
            >{{ props.text }}</span
        >

        <Transition
            appear-active-class="transition duration-200"
            appear-from-class="opacity-0"
            leave-active-class="transition duration-200"
            leave-to-class="opacity-0"
        >
            <span
                v-if="props.isLoading"
                class="absolute left-1/2 top-1/2 block h-10 w-10 -translate-x-1/2 -translate-y-1/2"
            >
                <BaseLoading />
            </span>
        </Transition>
    </component>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';
    import { NuxtLink } from '#components';

    const props = defineProps<{
        leadingIcon?: IconClass;
        text: string;
        isBig?: boolean;
        isBlack?: boolean;
        isLoading?: boolean;
        isOutlined?: boolean;
        isRedOutlined?: boolean;
        to?: string;
    }>();
</script>
