<template>
    <div class="container">
        <div class="hidden lg:mb-9 lg:flex lg:items-center lg:justify-between">
            <div>
                <div class="lg:mb-[24px]">
                    <BaseBreadcrumbs :links="breadcrumbs" />
                </div>

                <div class="">
                    <TheTitleSmall :tag="'h1'">Заказ #{{ order!.id }}</TheTitleSmall>
                </div>
            </div>

            <div>
                <BaseButton
                    @click="logout"
                    :is-loading="logoutIsPending"
                    :text="'Выйти'"
                    :is-big="true"
                    :is-red-outlined="true"
                    aria-label="Выйти из аккаунта"
                />
            </div>
        </div>

        <div class="space-y-9">
            <div class="md:max-w-[540px] lg:max-w-[690px]">
                <TheTitleSmaller class="mb-5 lg:mb-9">Информация о заказе</TheTitleSmaller>

                <div>
                    <InfoOrderText
                        :items="[
                            {
                                name: 'Дата',
                                description: dayjs(order?.createdAt).format('DD.MM.YYYY HH:mm'),
                            },
                            {
                                name: 'Товаров',
                                description: String(order!.products.length),
                            },
                            {
                                name: 'Способ оплаты',
                                description: order!.paymentType.name,
                            },
                            {
                                name: 'Статус заказа',
                                description: order!.status.name,
                            },
                            {
                                name: 'Сумма',
                                description: toRuPrice(order!.prices.price),
                            },
                            {
                                name: 'Доставка',
                                description: toRuPrice(order!.prices.deliveryPrice ?? 0),
                            },
                            {
                                name: 'Итоговая стоимость',
                                description: toRuPrice(order!.prices.price),
                                bold: true,
                            },
                            {
                                name: 'Адрес доставки',
                                description: order!.addressFields.street
                                    ? `ул ${order!.addressFields.street}, дом ${
                                          order!.addressFields.house
                                      }`
                                    : '',
                            },
                        ]"
                    />
                </div>
            </div>

            <div class="lg:max-w-[1070px]">
                <TheTitleSmaller class="mb-5 lg:mb-9">Состав заказа</TheTitleSmaller>

                <div class="space-y-3">
                    <CardProductHistoryOrders
                        v-for="product in order?.products"
                        :key="product.id"
                        :product="product"
                        :count="product.orderFields.count / product.step"
                        :price="product.orderFields.price"
                        :discount-price="product.orderFields.discountPrice"
                    />
                </div>

                <div class="mt-9 lg:w-[209px]">
                    <BaseButton
                        @click="repeatOrder()"
                        :is-loading="mergeIsPending"
                        :text="'Повторить заказ'"
                        :is-big="true"
                        aria-label="Повторить заказ "
                    />
                </div>
                <div class="mt-9 lg:hidden">
                    <BaseButton
                        @click="logout"
                        :is-loading="logoutIsPending"
                        :text="'Выйти'"
                        :is-big="true"
                        :is-red-outlined="true"
                        aria-label="Выйти из аккаунта"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';
    import headerTitleKey from '~/keys/headerTitleKey';
    import dayjs from 'dayjs';
    import { useBasketStore } from '~/stores/BasketStore';

    const route = useRoute();
    const router = useRouter();

    const basketStore = useBasketStore();

    const { data: order, status: getOrdersState } = await useAsyncData(
        `ger-order-${route.params.id}`,
        () => AistApi.getOrderDetail(Number(route.params.id)),
        {}
    );

    if (order.value === null) {
        throw createError({ statusCode: 404, statusMessage: 'Order not found' });
    }

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = `Заказ #${order.value!.id}`;

    const breadcrumbs = [
        { name: 'Главная', item: '/' },
        { name: 'Профиль', item: '/profile' },
        { name: `Заказ #${order.value!.id}` },
    ];

    useSeoMeta({
        title: `Заказ #${order.value!.id}`,
    });

    const { isPending: logoutIsPending, logout } = useLogout();

    const mergeIsPending = ref<boolean>(false);

    async function repeatOrder() {
        if (mergeIsPending.value) {
            return;
        }

        mergeIsPending.value = true;

        await basketStore.dropBasket();

        basketStore.basket = order.value!.products.map(function (product) {
            return {
                id: product.id,
                basketFields: {
                    count: product.orderFields.count / product.step,
                },
                createdAt: product.createdAt,
                name: product.name,
                slug: product.slug,
                price: product.price,
                priceOnline: product.priceOnline,
                hasDiscount: product.hasDiscount,
                discountPrice: product.discountPrice,
                step: product.step,
                minCount: product.minCount,
                stock: product.stock,
                unit: product.unit,
                weight: product.weight,
                description: product.description,
                isAvailable: product.isAvailable,
                isFavorite: product.isFavorite,
                images: product.images,
                manufacturer: product.manufacturer
                    ? {
                          id: product.manufacturer.id,
                          name: product.manufacturer.name,
                          logo: product.manufacturer.logo,
                      }
                    : undefined,
                brand: product.brand
                    ? {
                          id: product.brand.id,
                          name: product.brand.name,
                          logo: product.brand.logo,
                      }
                    : undefined,
            };
        });

        await basketStore.mergeBasket();
        await basketStore.getBasket();
        router.push('/cart');
        mergeIsPending.value = false;
    }
</script>
