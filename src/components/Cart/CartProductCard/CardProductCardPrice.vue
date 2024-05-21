<template>
    <div>
        <div
            v-if="props.oldPrice"
            class="truncate text-xs text-aist-grey line-through lg:text-base"
        >
            {{ toRuPrice(props.oldPrice) }}
        </div>

        <div
            :class="{ 'text-aist-red': props.oldPrice }"
            class="truncate font-semibold lg:text-[20px] lg:leading-normal"
        >
            {{ toRuPrice(props.price) }}
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        price: number;
        oldPrice?: number;
    }>();
</script>
