<template>
    <button
        @click="active = !active"
        :class="{ 'border-aist-red': active, 'border-none': props.borderNone }"
        class="relative block h-[46px] w-[46px] rounded-full border-2 border-aist-grey bg-white text-[20px] outline-none transition duration-[300ms] hover:border-aist-red focus:border-aist-red focus-visible:border-aist-red focus-visible:ring focus-visible:ring-aist-red/50"
    >
        <i
            :class="{ '!scale-0 !opacity-0': active }"
            class="icon-heart pointer-events-none absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 scale-100 text-aist-grey transition duration-300"
        ></i>

        <i
            :class="{ '!scale-100 !opacity-100': active }"
            class="icon-heart-filled pointer-events-none absolute left-1/2 top-1/2 z-10 block -translate-x-1/2 -translate-y-1/2 scale-0 text-aist-red opacity-0 transition duration-[400ms] ease-[cubic-bezier(0.64,_0.57,_0.67,_1.70)]"
        ></i>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps<{
        borderNone?: boolean;
    }>();

    const active = ref<boolean>(false);
</script>
