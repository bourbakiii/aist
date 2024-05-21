<template>
    <button
        :disabled="props.disabled"
        :aria-label="props.direction === 'left' ? 'Слайд назад' : 'Слайд вперед'"
        class="relative flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white text-aist-black shadow outline-none after:pointer-events-none after:absolute after:left-0 after:top-0 after:block after:h-full after:w-full after:rounded-full after:transition after:duration-100 hover:after:bg-black/5 focus:after:bg-aist-green/20 focus-visible:ring focus-visible:ring-aist-green [&:disabled]:pointer-events-none [&:disabled]:opacity-50 [&:not(:disabled)]:active:after:bg-aist-green/40 [&:not(:disabled)]:active:after:duration-0"
    >
        <i
            :class="{
                'icon-chevron-left-big': direction === 'left',
                'icon-chevron-right-big': direction === 'right',
            }"
            class="block text-[24px]"
        ></i>
    </button>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            direction: 'left' | 'right';
            disabled: boolean;
        }>(),
        {
            direction: 'left',
            disabled: false,
        }
    );
</script>
