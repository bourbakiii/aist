<template>
    <div
        class="relative rounded-[10px] bg-white p-4 shadow-aist md:flex md:items-center md:justify-between md:px-6 lg:px-12 lg:py-9"
    >
        <button
            @click="basketStore.removeFromBasket(product.id)"
            class="absolute right-[16px] top-[16px] h-[24px] w-[24px] text-[24px] text-aist-grey hover:text-aist-black focus:text-aist-black"
        >
            <i class="icon-cross"></i>
        </button>

        <div class="flex gap-3">
            <NuxtLink
                :href="canonicalUrl"
                :aria-label="`Перейти к '${product.name}'`"
                class="block flex-none self-start"
            >
                <NuxtPicture
                    :src="product.images[0] ?? $config.public.placeholderImageSrc"
                    :img-attrs="{
                        class: 'aspect-[1/1] w-[100px] rounded-md object-cover',
                    }"
                    :sizes="'100px'"
                    placeholder
                    loading="lazy"
                />
            </NuxtLink>

            <div
                class="flex flex-1 flex-col justify-between overflow-hidden md:w-[180px] md:max-w-[180px] lg:w-[320px] lg:max-w-[320px]"
            >
                <div>
                    <div class="text-sm font-semibold lg:text-base">
                        {{ product.name }}
                    </div>

                    <div class="mt-1 text-xs text-aist-grey lg:text-sm">{{ product.weight }}</div>
                </div>

                <div class="mt-2 md:mt-4">
                    <div class="md:hidden">
                        <CardProductCardPrice
                            :price="price"
                            :old-price="oldPrice ?? undefined"
                        />
                    </div>

                    <div class="hidden md:block">
                        <ProductCardFavoriteButton :product="product" />
                    </div>
                </div>
            </div>
        </div>

        <div class="hidden md:block md:w-[80px] md:text-right">
            <CardProductCardPrice
                :price="price"
                :old-price="oldPrice ?? undefined"
            />
        </div>

        <div class="mt-3 flex justify-between md:mt-0">
            <div class="flex items-start gap-2 sm:gap-4">
                <div class="w-[120px] flex-none sm:w-[130px] lg:w-[160px]">
                    <BaseProductQuantityInput
                        v-model="count"
                        :adding-step="product.step"
                        :stock="product.stock"
                        :min-count="product.minCount ?? product.step"
                        :measure="product.unit"
                        :is-big="isMobile === undefined ? undefined : !isMobile"
                    />

                    <div
                        v-if="product.minCount"
                        class="hidden lg:mt-3 lg:block lg:text-center"
                    >
                        Мин. количество: {{ product.minCount }}
                    </div>
                </div>

                <div class="flex-none md:hidden">
                    <ProductCardFavoriteButton :product="product" />
                </div>
            </div>

            <div class="ml-2 overflow-hidden md:hidden">
                <div class="truncate text-xs">{{ quantity }} {{ props.product.unit }}</div>

                <div class="">
                    <CardProductCardPrice :price="priceTweenedNumber.number" />
                </div>
            </div>
        </div>

        <div class="hidden md:block md:w-[150px] md:text-right">
            <CardProductCardPrice :price="priceTweenedNumber.number" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ProductBasket } from '~/api/AistApi/models/ProductBasket';
    import { useBasketStore } from '~/stores/BasketStore';
    import type { ProductMainSection } from '~/api/AistApi/models/ProductMainSection';

    const props = defineProps<{
        product: ProductBasket;
    }>();

    const { isMobile } = useMobile();

    const basketStore = useBasketStore();

    const count = computed({
        get() {
            return basketStore.countInBasket(props.product.id);
        },

        set(newValue) {
            basketStore.changeProductCount(props.product, newValue);
        },
    });

    const quantity = computed(() => {
        const quantity = count.value * props.product.step;

        if (Number.isInteger(quantity)) {
            return quantity;
        }

        return quantity.toFixed(2);
    });

    const price = computed(() => {
        return props.product.discountPrice ? props.product.discountPrice : props.product.price;
    });

    const oldPrice = computed(() => {
        return props.product.discountPrice ? props.product.price : null;
    });

    const totalPrice = computed(() => {
        return props.product.price * props.product.basketFields.count;
    });

    const { tweenedNumber: priceTweenedNumber } = useTweenedNumber(totalPrice);

    const canonicalUrl = computed(() => {
        if (!props.product.mainSection) {
            return;
        }

        function recursiveFun(section: ProductMainSection, prevUrl?: string) {
            let url: string;

            if (prevUrl) {
                url = `${section.slug}/${prevUrl}`;
            } else {
                url = `${section.slug}`;
            }

            if (section.parent) {
                url = `${recursiveFun(section.parent, url)}`;
            }

            return url;
        }

        return `/catalog/${recursiveFun(props.product.mainSection)}/${props.product.slug}`;
    });
</script>
