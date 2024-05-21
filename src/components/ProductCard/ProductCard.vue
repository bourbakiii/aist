<template>
    <div
        :class="{ '!border-aist-green': inBasket }"
        class="group relative block overflow-hidden rounded-[10px] border-2 border-transparent bg-white pb-[154px] shadow-aist outline-none transition duration-75 focus:ring focus:ring-aist-green-light xl:pb-[150px] [&:has(.product-card-link-img:focus)]:ring [&:has(.product-card-link-img:focus)]:ring-aist-green-light"
    >
        <div class="absolute right-2 top-2 z-10 xl:hidden">
            <ProductCardFavoriteButton
                :product="product"
                :aria-label="`Добавить '${product.name}' в избранное`"
            />
        </div>

        <NuxtLink
            :aria-label="`Перейти к '${product.name}'`"
            :href="to"
            class="product-card-link-img block outline-none"
        >
            <NuxtPicture
                :src="product.images[0] ?? $config.public.placeholderImageSrc"
                :alt="product.name"
                :img-attrs="{
                    class: 'aspect-[1/1] w-full rounded-[8px] object-cover',
                }"
                :sizes="'200px lg:300px'"
                placeholder
                loading="lazy"
            />
        </NuxtLink>

        <div class="absolute right-0 top-[36px] hidden xl:block">
            <Transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="translate-x-full"
                leave-active-class="transition ease-in duration-300"
                leave-to-class="translate-x-full"
            >
                <button
                    v-if="inBasket"
                    @click="removeFromCart"
                    :aria-label="`Удалить '${product.name}' из корзины`"
                    class="rounded-l-full bg-aist-green py-[6px] pl-[9px] pr-[3px] text-[24px] text-white outline-none focus-visible:ring focus-visible:ring-aist-green-light"
                >
                    <i class="icon-cross block"></i>
                </button>
            </Transition>
        </div>

        <div
            class="absolute bottom-0 left-0 w-full rounded-t-[10px] bg-white px-2 pb-4 pt-3 shadow xl:bottom-auto xl:top-full xl:-translate-y-full"
        >
            <div
                v-if="discountPercent"
                class="absolute bottom-[calc(100%_+_8px)] left-2 rounded-[10px] bg-aist-red px-2 py-1 text-xs font-semibold text-white xl:text-sm"
            >
                -{{ discountPercent }}%
            </div>

            <div>
                <div class="min-h-[80px]">
                    <div class="line-clamp-3 text-sm font-semibold xl:text-base">
                        <NuxtLink
                            :href="to"
                            class="outline-none hover:underline focus:underline"
                        >
                            {{ product.name }}
                        </NuxtLink>
                    </div>

                    <div class="mt-1 truncate text-xs text-aist-grey xl:text-sm">
                        {{ product.weight }}
                    </div>
                </div>

                <div class="mt-2 xl:hidden">
                    <ProductCardPrice
                        v-if="inBasket"
                        :price="price"
                        :old-price="oldPrice ?? undefined"
                    />
                </div>

                <div class="mt-2 flex h-[38px] items-center xl:hidden">
                    <template v-if="!inBasket">
                        <div class="flex-1">
                            <ProductCardPrice
                                :price="price"
                                :old-price="oldPrice ?? undefined"
                            />
                        </div>

                        <BaseButtonIcon
                            @click="addToCart"
                            :icon-class="'icon-cart'"
                            :aria-label="`Добавить '${product.name}' в корзину`"
                        />
                    </template>

                    <div
                        v-else
                        class="w-full"
                    >
                        <BaseProductQuantityInput
                            v-model="countInBasket"
                            :measure="product.unit"
                            :adding-step="product.step"
                            :set-focus-on-mounted="true"
                            :stock="product.stock"
                        />
                    </div>
                </div>

                <div class="hidden xl:mt-2 xl:block">
                    <ProductCardPrice
                        :price="price"
                        :old-price="oldPrice ?? undefined"
                    />
                </div>

                <div
                    class="hidden xl:block xl:max-h-0 xl:opacity-0 xl:transition-[max-height,opacity] xl:duration-500 xl:ease-in-out xl:group-focus-within:max-h-[56px] xl:group-focus-within:opacity-100 xl:group-hover:max-h-[58px] xl:group-hover:opacity-100"
                >
                    <div class="flex h-[56px] items-center justify-between pt-5">
                        <div>
                            <Transition
                                enter-active-class="transition duration-[400ms]"
                                leave-active-class="transition duration-[400ms]"
                                enter-from-class="-translate-y-full opacity-0"
                                leave-to-class="translate-y-full opacity-0"
                                mode="out-in"
                            >
                                <BaseButton
                                    v-if="!inBasket"
                                    @click="addToCart"
                                    :text="'В корзину'"
                                    :aria-label="`Добавить '${product.name}' в корзину`"
                                />

                                <BaseProductQuantityInput
                                    v-else
                                    v-model="countInBasket"
                                    :measure="product.unit"
                                    :adding-step="product.step"
                                    :stock="product.stock"
                                />
                            </Transition>
                        </div>

                        <div class="ml-4 flex-none">
                            <ProductCardFavoriteButton
                                :product="product"
                                :aria-label="`Добавить '${product.name}' в избранное`"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useBasketStore } from '~/stores/BasketStore';
    import type { Product } from '~/api/AistApi/models/Product';
    import type { ProductMainSection } from '~/api/AistApi/models/ProductMainSection';

    const basketStore = useBasketStore();

    const props = defineProps<{
        product: Product;
        to?: string;
    }>();

    const price = computed(() => {
        return props.product.discountPrice ? props.product.discountPrice : props.product.price;
    });

    const oldPrice = computed(() => {
        return props.product.discountPrice ? props.product.price : null;
    });

    const discountPercent = computed(() => {
        const price = 100 - ((props.product.discountPrice ?? 0) / props.product.price) * 100;

        if (price === 100) {
            return null;
        }

        return price.toFixed(0);
    });

    const countInBasket = computed({
        get() {
            return basketStore.countInBasket(props.product.id);
        },
        set(newValue) {
            basketStore.changeProductCount(props.product, newValue);
        },
    });

    function addToCart() {
        countInBasket.value = 1;
    }

    function removeFromCart() {
        countInBasket.value = 0;
    }

    const inBasket = computed(() => {
        return countInBasket.value > 0;
    });

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

    const to = computed(() => {
        if (props.to) {
            return props.to;
        }

        if (canonicalUrl.value) {
            return canonicalUrl.value;
        }

        return;
    });
</script>
