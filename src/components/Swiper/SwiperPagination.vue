<template>
    <div class="flex justify-center gap-2">
        <div
            v-for="n in props.slides"
            :key="n"
            :class="{ '!scale-125 !bg-aist-green': n - 1 === props.activeSlide }"
            class="block h-2 w-2 rounded-full bg-aist-grey-light transition-colors transition-transform duration-200"
        ></div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        slides: number;
        activeSlide: number;
    }>();
</script>
