<template>
    <component
        :is="props.tag ?? 'section'"
        class="my-9 lg:my-16"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
    const props = defineProps<{
        tag?: string;
    }>();
</script>
