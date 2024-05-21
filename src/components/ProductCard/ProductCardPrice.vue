<template>
    <div
        class="flex h-[38px] flex-col justify-end xl:h-auto xl:flex-row-reverse xl:items-end xl:justify-end xl:gap-2"
    >
        <span
            v-if="oldPrice"
            class="truncate text-xs leading-[16px] text-aist-grey line-through xl:text-sm"
        >
            {{ priceFormatter.format(oldPrice) }}
        </span>

        <span
            :class="{ 'text-aist-red': !!oldPrice }"
            class="truncate text-base font-semibold leading-[22px] xl:max-w-full xl:flex-shrink-0 xl:flex-grow-0 xl:text-xl"
        >
            {{ priceFormatter.format(price) }}
        </span>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        price: number;
        oldPrice?: number;
    }>();

    const priceFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });
</script>
