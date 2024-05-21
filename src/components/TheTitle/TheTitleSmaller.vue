<template>
    <component
        :is="props.tag ?? 'h3'"
        class="font-Inter text-[20px] font-bold lg:text-[30px]"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
    const props = defineProps<{
        tag?: string;
    }>();
</script>
