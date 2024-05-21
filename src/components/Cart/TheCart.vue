<template>
    <div
        v-if="
            basketStore.basket.length ||
            getProductsStatus === 'idle' ||
            getProductsStatus === 'pending'
        "
        class="xl:grid xl:grid-cols-4 xl:gap-5"
    >
        <div class="xl:col-span-3">
            <div
                v-if="
                    userStore.isAuthenticated &&
                    (getProductsStatus === 'idle' || getProductsStatus === 'pending')
                "
                class="space-y-3 lg:space-y-5"
            >
                <CartProductCardSkeleton
                    v-for="n in 3"
                    :key="n"
                />
            </div>

            <template v-else>
                <div
                    v-if="basketStore.basket.length"
                    class="space-y-3 lg:space-y-5"
                >
                    <CartProductCard
                        v-for="product in basketStore.basket"
                        :key="product.id"
                        :product="product"
                    />
                </div>
            </template>
        </div>

        <div class="mt-9 xl:col-span-1 xl:mt-0">
            <CartTotalSkeleton
                v-if="
                    userStore.isAuthenticated &&
                    (getProductsStatus === 'idle' ||
                        getProductsStatus === 'pending' ||
                        calcBasketStatus === 'idle' ||
                        (calcBasketStatus === 'pending' && !calcBasketData))
                "
            />

            <div v-else-if="basketStore.basket.length">
                <CartTotal
                    @checkout-click="router.push('/cart/checkout')"
                    @send-promocode="
                        (promocode) => {
                            basketStore.promocode = promocode;
                        }
                    "
                    :promocode="basketStore.promocode"
                    :attributes="[
                        {
                            id: 'products',
                            name: 'Товаров на',
                            value: toRuPrice(calcBasketData?.priceProducts ?? 0),
                        },
                        {
                            id: 'discount',
                            name: 'Скидка',
                            value: toRuPrice(
                                calcBasketData!.priceProducts -
                                    calcBasketData!.price -
                                    (calcBasketData!.promocodeDiscount ?? 0) -
                                    calcBasketData!.deliveryPrice
                            ),
                        },
                        {
                            id: 'delivery',
                            name: 'Стоимость доставки',
                            value: toRuPrice(calcBasketData?.deliveryPrice ?? 0),
                        },
                    ]"
                    :total-price="calcBasketData?.price ?? 0"
                    :promocode-discount="calcBasketData?.promocodeDiscount"
                    :promocode-error="calcBasketForm.promocode.error"
                    :is-pending="calcBasketStatus === 'pending'"
                />
            </div>
        </div>
    </div>

    <NotFound v-else>
        <template #message
            >Начните добавлять товары в «Корзину», чтобы увидеть их здесь и купить
        </template>
    </NotFound>
</template>

<script setup lang="ts">
    import { useBasketStore } from '~/stores/BasketStore';
    import { useUserStore } from '~/stores/UserStore';
    import debounce from 'lodash/debounce';

    const router = useRouter();

    const basketStore = useBasketStore();

    const userStore = useUserStore();

    const {
        response: { data: products, status: getProductsStatus },
    } = await useGetBasket({
        server: false,
        lazy: true,
        immediate: userStore.isAuthenticated,
    });

    watch(products, () => {
        basketStore.basket = products.value ?? [];
    });

    const {
        response: { data: calcBasketData, status: calcBasketStatus, execute: calcBasketExecute },
        form: calcBasketForm,
    } = await useCalcBasket({
        immediate: false,
        lazy: true,
        server: false,
    });

    const calcBasketExecuteDebounced = debounce(calcBasketExecute, 1000);

    watch(
        () => basketStore.basket,
        () => {
            calcBasketForm.products.value = basketStore.basket.map((p) => ({
                id: p.id,
                count: p.basketFields.count,
            }));
        }
    );

    watch(
        () => calcBasketForm.products.value,
        () => {
            calcBasketExecuteDebounced();
        }
    );

    watch(
        () => basketStore.promocode,
        () => {
            calcBasketForm.promocode.value = basketStore.promocode;
        },
        {
            immediate: true,
        }
    );

    watch(
        () => calcBasketForm.promocode.value,
        () => {
            calcBasketExecuteDebounced();
        }
    );
</script>
