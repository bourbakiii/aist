<template>
    <div>
        <div>
            <div class="flex items-center">
                <div
                    class="mb-[13.5px] flex w-[100%] items-center justify-between lg:justify-normal"
                >
                    <NuxtLink
                        :to="`/profile/${order.id}`"
                        class="text-xl font-semibold hover:underline focus:underline"
                    >
                        Заказ #{{ order.id }}
                    </NuxtLink>

                    <div class="lg:5 ml-4 hidden text-[16px] font-normal text-aist-grey lg:block">
                        {{ dayjs(order.createdAt).format('DD.MM.YYYY HH:mm') }}
                    </div>

                    <NuxtLink :to="`/profile/${order.id}`">
                        <a
                            class="text-sm font-semibold text-aist-green lg:hidden"
                            href="#"
                        >
                            Повторить
                        </a>
                    </NuxtLink>
                </div>

                <div class="hidden whitespace-nowrap text-base lg:block">
                    {{ productsQuantity }}
                </div>
            </div>
        </div>

        <div>
            <div
                class="flex flex-col justify-between rounded-[10px] bg-white px-[16px] py-[24px] shadow-md lg:flex-row lg:items-center lg:px-[24px] lg:py-9"
            >
                <div class="flex">
                    <div v-for="img in slicedImages">
                        <NuxtLink
                            :to="`/profile/${order.id}`"
                            class="mr-2 block"
                        >
                            <div
                                class="h-[40px] w-[40px] md:h-[85px] md:w-[85px] lg:ml-4 2xl:h-[100px] 2xl:w-[100px]"
                            >
                                <NuxtPicture
                                    :src="img ?? $config.public.placeholderImageSrc"
                                    :img-attrs="{
                                        class: 'aspect-[1/1] w-full rounded-[10px] object-cover',
                                    }"
                                    :sizes="'40px md:85px 2xl:100px'"
                                    placeholder
                                    loading="lazy"
                                />
                            </div>
                        </NuxtLink>
                    </div>

                    <div
                        v-if="remainingImages > 0"
                        class="flex items-center text-xl text-aist-green lg:ml-4"
                    >
                        +{{ remainingImages }}
                    </div>
                </div>

                <div class="hidden lg:block">
                    <BaseButton
                        :to="`/profile/${order.id}`"
                        :text="'Повторить'"
                    />
                </div>
            </div>

            <div class="mt-3 flex justify-between lg:hidden">
                <span class="text-aist-grey">
                    {{ dayjs(order.createdAt).format('DD.MM.YYYY HH:mm') }}
                </span>

                <span class="text-aist-black">{{ productsQuantity }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Order } from '~/api/AistApi/models/Order';
    import dayjs from 'dayjs';

    const props = defineProps<{
        order: Order;
    }>();

    const showingProductsLength = 5;

    const slicedImages = computed(() => {
        return props.order.products.slice(0, showingProductsLength).map((product) => {
            return product.images[0];
        });
    });

    const remainingImages = computed(() => {
        return props.order.products.length - showingProductsLength;
    });

    const productsQuantity = computed(() => {
        switch (props.order.products.length) {
            case 1:
                return `${props.order.products.length} товар`;
                break;

            case 2:
            case 3:
            case 4:
                return `${props.order.products.length} товара`;
                break;

            default:
                return `${props.order.products.length} товаров`;
                break;
        }
    });
</script>
