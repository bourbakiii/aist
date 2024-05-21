<template>
    <div
        ref="accordionNode"
        class="accordion space-y-4"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
    import Accordion from '~/utils/Accordion/Accordion';

    const props = defineProps<{
        initActiveIndex?: number;
    }>();

    let accordion: Accordion | null = null;
    const accordionNode = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        accordion = new Accordion(accordionNode.value!);

        if (props.initActiveIndex !== undefined) {
            accordion.openTab(props.initActiveIndex, 0);
        }
    });
</script>

<style lang="scss" scoped>
    .accordion {
    }
</style>
