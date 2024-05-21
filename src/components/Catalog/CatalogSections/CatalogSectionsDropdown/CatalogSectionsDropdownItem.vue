<template>
    <component
        :is="props.as"
        class="catalog-sections-dropdown-item"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            as?: string;
        }>(),
        {
            as: 'div',
        }
    );
</script>
