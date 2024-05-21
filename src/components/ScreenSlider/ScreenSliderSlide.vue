<template>
    <div
        :data-screen-slider-id="props.id"
        :data-screen-slider-title="props.title"
        class="screen-slider-slide"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        id: string;
        title?: string;
    }>();
</script>
