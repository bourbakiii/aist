<template>
    <div
        class="flex overflow-hidden rounded-[10px] bg-white p-4 shadow-aist md:px-[24px] md:py-[16px]"
    >
        <div class="mr-3 h-[100px] w-[100px] flex-none">
            <NuxtPicture
                :src="product.images[0] ?? $config.public.placeholderImageSrc"
                :alt="product.name"
                :img-attrs="{
                    class: 'aspect-[1/1] w-full rounded-[10px] object-cover md:object-contain',
                }"
                :sizes="'100px'"
                placeholder
                loading="lazy"
            />
        </div>

        <div
            class="flex w-full flex-col justify-between overflow-hidden md:flex md:flex-row md:items-center md:justify-between"
        >
            <div class="md:w-[180px] md:self-start lg:w-[320px]">
                <div class="text-sm font-semibold lg:text-base">{{ product.name }}</div>

                <div
                    v-if="product.weight"
                    class="mt-1 text-xs text-aist-grey"
                >
                    {{ product.weight }}
                </div>
            </div>

            <div class="mt-2 flex flex-wrap items-end justify-between gap-2 md:hidden">
                <div class="max-w-full">
                    <div
                        v-if="oldPrice"
                        class="truncate text-xs text-aist-grey line-through"
                    >
                        {{ toRuPrice(oldPrice) }}
                    </div>

                    <div
                        :class="{ 'text-aist-red': oldPrice }"
                        class="truncate font-semibold"
                    >
                        {{ toRuPrice(price) }}
                    </div>
                </div>

                <div class="max-w-full md:hidden">
                    <div class="truncate text-xs">{{ `${count} ${product.unit}` }}</div>

                    <div class="truncate font-semibold">{{ toRuPrice(totalPrice) }}</div>
                </div>
            </div>

            <div class="hidden md:block md:max-w-[200px]">
                <div
                    v-if="oldPrice"
                    class="truncate text-aist-grey line-through"
                >
                    {{ toRuPrice(oldPrice) }}
                </div>

                <div
                    :class="{ 'text-aist-red': oldPrice }"
                    class="truncate text-xl font-semibold"
                >
                    {{ toRuPrice(price) }}
                </div>
            </div>

            <div class="hidden text-sm font-normal md:block md:max-w-[200px] lg:text-base">
                {{ `${count} ${product.unit}` }}
            </div>

            <div
                class="hidden text-right text-base font-semibold text-aist-black md:block md:w-[200px] lg:text-xl"
            >
                {{ toRuPrice(totalPrice) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Product } from '~/api/AistApi/models/Product';

    const props = defineProps<{
        product: Product;
        price: number;
        count: number;
        discountPrice?: number;
    }>();

    const price = computed(() => {
        return props.discountPrice ? props.discountPrice : props.price;
    });

    const oldPrice = computed(() => {
        return props.discountPrice ? props.price : null;
    });

    const totalPrice = computed(() => {
        return props.price * props.count;
    });
</script>
