<template>
    <component
        :is="props.tag ?? 'h2'"
        class="font-Inter text-xl font-bold lg:text-[40px] lg:leading-normal"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
    const props = defineProps<{
        tag?: string;
    }>();
</script>
