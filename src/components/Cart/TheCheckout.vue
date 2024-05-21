<template>
    <div>
        <div
            v-if="step === 'making'"
            class="xl:grid xl:grid-cols-4 xl:gap-5"
        >
            <div class="xl:col-span-3">
                <BaseLoadingWrapper :show="isComponentsLoading">
                    <div class="space-y-9">
                        <section>
                            <TheTitleSmaller class="mb-6"> Способ получения </TheTitleSmaller>

                            <TheTabs
                                v-model="form.deliveryType.value"
                                :tabs="[
                                    {
                                        id: 'courier',
                                        name: 'Доставка',
                                    },
                                    {
                                        id: 'pickup',
                                        name: 'Самовывоз',
                                    },
                                ]"
                            >
                                <TabsItem class="space-y-9">
                                    <div class="xl:w-[450px]">
                                        <BaseAlertWrapper
                                            :type="'error'"
                                            :show="!!form.address.error"
                                            :absolute="false"
                                        >
                                            <DadataSelect
                                                v-model="form.address.value"
                                                placeholder="Адрес доставки"
                                            />

                                            <template #message>
                                                <div class="mt-2">
                                                    {{ form.address.error }}
                                                </div>
                                            </template>
                                        </BaseAlertWrapper>
                                    </div>

                                    <div>
                                        <div class="mb-6 text-lg font-semibold xl:text-xl">
                                            Дата и время доставки
                                        </div>

                                        <BaseAlertWrapper
                                            :type="'error'"
                                            :show="!!form.ticket.error"
                                            :absolute="false"
                                        >
                                            <TheTickets
                                                v-model="form.ticket.value"
                                                :tickets="
                                                    slotsData?.map((slot) => ({
                                                        id: slot.id,
                                                        start: slot.start,
                                                        end: slot.end,
                                                    })) ?? []
                                                "
                                            />

                                            <template #message>
                                                <div class="mt-2">
                                                    {{ form.ticket.error }}
                                                </div>
                                            </template>
                                        </BaseAlertWrapper>
                                    </div>
                                </TabsItem>

                                <TabsItem class="space-y-9">
                                    <div>
                                        <div class="mb-6 text-lg font-semibold xl:text-xl">
                                            Информация о самовывозе
                                        </div>

                                        <div class="space-y-6">
                                            <div>
                                                <div class="mb-2 font-semibold">АШАН Авиапарк</div>

                                                <div>
                                                    125252, г Москва, Хорошевский р-н, Ходынский
                                                    б-р, д 4
                                                </div>
                                            </div>

                                            <div>
                                                <ul class="space-y-2">
                                                    <li
                                                        v-for="scheduleItem in [
                                                            {
                                                                days: 'Пн-Пт',
                                                                times: 'с 8:30 до 00:00',
                                                            },
                                                            {
                                                                days: 'Сб–Вс',
                                                                times: 'с 8:30 до 19:00',
                                                            },
                                                        ]"
                                                        class="flex items-baseline"
                                                    >
                                                        <div
                                                            class="mr-8 w-[60px] flex-none overflow-hidden text-ellipsis"
                                                        >
                                                            {{ scheduleItem.days }}
                                                        </div>

                                                        <div>{{ scheduleItem.times }}</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="mb-6 text-lg font-semibold xl:text-xl">
                                            Дата и время доставки
                                        </div>

                                        <BaseAlertWrapper
                                            :type="'error'"
                                            :show="!!form.ticket.error"
                                            :absolute="false"
                                        >
                                            <TheTickets
                                                v-model="form.ticket.value"
                                                :tickets="
                                                    slotsData?.map((slot) => ({
                                                        id: slot.id,
                                                        start: slot.start,
                                                        end: slot.end,
                                                    })) ?? []
                                                "
                                            />

                                            <template #message>
                                                <div class="mt-2">
                                                    {{ form.ticket.error }}
                                                </div>
                                            </template>
                                        </BaseAlertWrapper>
                                    </div>
                                </TabsItem>
                            </TheTabs>
                        </section>

                        <section>
                            <TheTitleSmaller class="mb-6"> Способ оплаты </TheTitleSmaller>

                            <div>
                                <BaseAlertWrapper
                                    :type="'error'"
                                    :show="!!form.paymentType.error"
                                    :absolute="false"
                                >
                                    <ul class="space-y-4">
                                        <li
                                            v-for="paymentType in paymentData ?? []"
                                            :key="paymentType.id"
                                        >
                                            <BaseRadio
                                                v-model="form.paymentType.value"
                                                :value="paymentType.id"
                                            >
                                                {{ paymentType.name }}
                                            </BaseRadio>
                                        </li>
                                    </ul>

                                    <template #message>
                                        <div class="mt-2">
                                            {{ form.paymentType.error }}
                                        </div>
                                    </template>
                                </BaseAlertWrapper>
                            </div>
                        </section>

                        <section>
                            <TheTitleSmaller class="mb-6"> Данные о покупателе </TheTitleSmaller>

                            <div class="space-y-6 xl:w-[450px]">
                                <div>
                                    <BaseAlertWrapper
                                        :type="'error'"
                                        :show="!!form.name.error"
                                        :absolute="false"
                                    >
                                        <BaseInput
                                            v-model="form.name.value"
                                            :leading-icon="'icon-user'"
                                            :required="true"
                                            name="fio"
                                            label="ФИО"
                                        />

                                        <template #message>
                                            <div class="mt-2">
                                                {{ form.name.error }}
                                            </div>
                                        </template>
                                    </BaseAlertWrapper>
                                </div>

                                <div>
                                    <BaseAlertWrapper
                                        :type="'error'"
                                        :show="!!form.phone.error"
                                        :absolute="false"
                                    >
                                        <BaseInput
                                            v-model="form.phone.value"
                                            :leading-icon="'icon-phone'"
                                            :mask="{
                                                mask: '+{7}(000)000-00-00',
                                            }"
                                            :required="true"
                                            name="tel"
                                            placeholder="+7 (___) ___-__-__"
                                            label="Телефон"
                                        />

                                        <template #message>
                                            <div class="mt-2">
                                                {{ form.phone.error }}
                                            </div>
                                        </template>
                                    </BaseAlertWrapper>
                                </div>

                                <div>
                                    <BaseAlertWrapper
                                        :type="'error'"
                                        :show="!!form.email.error"
                                        :absolute="false"
                                    >
                                        <BaseInput
                                            v-model="form.email.value"
                                            :leading-icon="'icon-mail'"
                                            :required="true"
                                            name="email"
                                            label="Почта"
                                        />

                                        <template #message>
                                            <div class="mt-2">
                                                {{ form.email.error }}
                                            </div>
                                        </template>
                                    </BaseAlertWrapper>
                                </div>

                                <div>
                                    <BaseAlertWrapper
                                        :type="'error'"
                                        :show="!!form.message.error"
                                        :absolute="false"
                                    >
                                        <BaseInput
                                            v-model="form.message.value"
                                            :leading-icon="'icon-mail'"
                                            name="comment"
                                            type="textarea"
                                            label="Комментарий к заказу"
                                        />

                                        <template #message>
                                            <div class="mt-2">
                                                {{ form.message.error }}
                                            </div>
                                        </template>
                                    </BaseAlertWrapper>
                                </div>
                            </div>
                        </section>

                        <section>
                            <TheTitleSmaller class="mb-6">Товары в заказе</TheTitleSmaller>

                            <div class="space-y-3 lg:space-y-5">
                                <CardProductHistoryOrders
                                    v-for="product in products"
                                    :key="product.id"
                                    :product="product"
                                    :count="product.basketFields.count * product.step"
                                    :price="product.price"
                                    :discount-price="product.discountPrice"
                                />
                            </div>
                        </section>
                    </div>
                </BaseLoadingWrapper>
            </div>

            <div class="mt-9 xl:col-span-1 xl:mt-0">
                <div class="xl:sticky xl:left-0 xl:top-[114px] xl:w-full">
                    <CartTotalSkeleton
                        v-if="
                            isComponentsLoading ||
                            calcBasketStatus === 'idle' ||
                            (calcBasketStatus === 'pending' && !calcBasketData)
                        "
                    />

                    <CartTotal
                        v-else-if="basketStore.basket.length"
                        @checkout-click="makeOrder"
                        @change-order-click="router.push('/cart')"
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
                        :promocode-error="calcBasketForm.promocode.error || form.promocode.error"
                        :is-pending="
                            calcBasketStatus === 'pending' || makeOrderStatus === 'pending'
                        "
                        :show-change-order="true"
                    />
                </div>
            </div>
        </div>

        <div v-else-if="step === 'success'">
            <div>
                <div>
                    <div class="mb-4 text-lg font-semibold lg:text-xl">Заказ оформлен успешно!</div>

                    <div>
                        Благодарим вас за заказ! В ближайшее время мы свяжемся с вами по указанному
                        номеру телефона для уточнения деталей доставки.
                    </div>
                </div>

                <div class="mt-9 lg:max-w-[300px]">
                    <BaseButton
                        :to="'/'"
                        :text="'На главную'"
                        :is-big="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useBasketStore } from '~/stores/BasketStore';
    import { useUserStore } from '~/stores/UserStore';
    import debounce from 'lodash/debounce';
    import AistApi, { MakeOrderError } from '~/api/AistApi/AistApi';

    const router = useRouter();

    const userStore = useUserStore();
    const basketStore = useBasketStore();

    const form: {
        deliveryType: {
            value: string;
            error: string;
        };
        address: {
            value: {
                fullAddress: string;
                street: string;
                house: string;
            } | null;
            error: string;
        };
        ticket: {
            value: {
                id: string;
                start: Date;
                end: Date;
            } | null;
            error: string;
        };
        paymentType: {
            value: string | null;
            error: string;
        };
        name: {
            value: string;
            error: string;
        };
        phone: {
            value: string;
            error: string;
        };
        email: {
            value: string;
            error: string;
        };
        message: {
            value: string;
            error: string;
        };
        products: {
            value: { id: string; count: number };
            error: string;
        }[];
        promocode: {
            value: string;
            error: string;
        };
    } = reactive({
        deliveryType: {
            value: 'courier',
            error: '',
        },
        address: {
            value: null,
            error: '',
        },
        ticket: {
            value: null,
            error: '',
        },
        paymentType: {
            value: null,
            error: '',
        },
        name: {
            value: '',
            error: '',
        },
        phone: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        message: {
            value: '',
            error: '',
        },
        products: [],
        promocode: {
            value: '',
            error: '',
        },
    });

    watch(
        () => form.deliveryType.value,
        () => {
            form.deliveryType.error = '';
        }
    );

    watch(
        () => form.address.value,
        () => {
            form.address.error = '';
        }
    );

    watch(
        () => form.ticket.value,
        () => {
            form.ticket.error = '';
        }
    );

    watch(
        () => form.paymentType.value,
        () => {
            form.paymentType.error = '';
        }
    );

    watch(
        () => form.name.value,
        () => {
            form.name.error = '';
        }
    );

    watch(
        () => form.phone.value,
        () => {
            form.phone.error = '';
        }
    );

    watch(
        () => form.email.value,
        () => {
            form.email.error = '';
        }
    );

    watch(
        () => form.message.value,
        () => {
            form.message.error = '';
        }
    );

    watch(
        () => form.promocode.value,
        () => {
            form.promocode.error = '';
        }
    );

    const {
        response: { data: productsData, status: getProductsStatus },
    } = await useGetBasket({
        server: false,
        lazy: true,
        immediate: userStore.isAuthenticated,
    });

    watch(productsData, () => {
        basketStore.basket = productsData.value ?? [];
    });

    const {
        response: { data: slotsData, status: getSlotsStatus },
    } = await useGetTickets(4, {
        server: false,
        lazy: true,
        immediate: true,
    });

    const {
        response: { data: paymentData, status: getPaymentStatus },
    } = await useGetPaymentTypes({
        server: false,
        lazy: true,
        immediate: true,
    });

    const {
        response: { data: userData, status: getUserStatus },
    } = await useGetUser({
        server: false,
        lazy: true,
        immediate: true,
    });

    watch(userData, () => {
        if (!userData.value) {
            return;
        }

        form.name.value = userData.value.name;
        form.phone.value = userData.value.phone;
        form.email.value = userData.value.email;
    });

    const products = computed(() => basketStore.basket);

    const {
        response: { data: calcBasketData, status: calcBasketStatus, execute: calcBasketExecute },
        form: calcBasketForm,
    } = await useCalcBasket({
        lazy: true,
        server: false,
    });

    watch(
        () => basketStore.promocode,
        () => {
            calcBasketForm.promocode.value = basketStore.promocode;
            form.promocode.value = basketStore.promocode;
        },
        {
            immediate: true,
        }
    );

    calcBasketForm.products.value = products.value.map((p) => ({
        id: p.id,
        count: p.basketFields.count,
    }));

    form.products = products.value.map((p) => ({
        value: {
            id: p.id,
            count: p.basketFields.count,
        },
        error: '',
    }));

    const calcBasketExecuteDebounced = debounce(calcBasketExecute, 1000);

    watch(
        () => calcBasketForm.promocode.value,
        () => {
            calcBasketExecuteDebounced();
        }
    );

    watch(
        () => form.deliveryType.value,
        () => {
            calcBasketForm.deliveryType.value = form.deliveryType.value;

            calcBasketExecuteDebounced();
        }
    );

    watch(
        () => form.paymentType.value,
        () => {
            calcBasketForm.paymentType.value = form.paymentType.value || '';

            calcBasketExecuteDebounced();
        }
    );

    const isComponentsLoading = computed(() => {
        return (
            getSlotsStatus.value === 'idle' ||
            getSlotsStatus.value === 'pending' ||
            getPaymentStatus.value === 'idle' ||
            getPaymentStatus.value === 'pending' ||
            calcBasketStatus.value === 'idle' ||
            (calcBasketStatus.value === 'pending' && !calcBasketData.value)
        );
    });

    function clearErrors() {
        form.deliveryType.error = '';
        form.address.error = '';
        form.ticket.error = '';
        form.paymentType.error = '';
        form.name.error = '';
        form.phone.error = '';
        form.email.error = '';
        form.message.error = '';

        form.products.map((p) => {
            p.error = '';
        });
    }

    const makeOrderStatus = ref<'idle' | 'pending' | 'success' | 'error'>('idle');

    const step = ref<'making' | 'success'>('making');

    async function makeOrder() {
        if (makeOrderStatus.value === 'pending' || isComponentsLoading.value) {
            return;
        }

        clearErrors();

        makeOrderStatus.value = 'pending';

        try {
            await AistApi.makeOrder({
                name: form.name.value,
                phone: form.phone.value,
                email: form.email.value,
                paymentTypeId: form.paymentType.value || '',
                deliveryType: form.deliveryType.value,
                products: form.products.map((p) => ({
                    id: p.value.id,
                    count: p.value.count,
                })),
                slotId: form.ticket.value?.id,
                message: form.message.value,
                street: form.address.value?.street,
                house: form.address.value?.house,
                promocode: form.promocode.value,
            });

            step.value = 'success';

            makeOrderStatus.value = 'success';

            basketStore.basket = [];
            basketStore.promocode = '';
        } catch (e) {
            makeOrderStatus.value = 'error';

            if (e instanceof MakeOrderError) {
                form.name.error = e.errors.name ?? '';
                form.phone.error = e.errors.phone ?? '';
                form.email.error = e.errors.email ?? '';
                form.paymentType.error = e.errors.paymentTypeId ?? '';
                form.deliveryType.error = e.errors.deliveryType ?? '';
                form.ticket.error = e.errors.slotId ?? '';
                form.message.error = e.errors.message ?? '';
                form.address.error =
                    e.errors.house || e.errors.street ? 'Поле адрес является обязательным' : '';
                form.promocode.error = e.errors.promocode ?? '';

                e.errors.products?.map((product) => {
                    const findedIndex = form.products.findIndex((p) => p.value.id === product.id);

                    if (findedIndex === -1) {
                        return;
                    }

                    const newProduct = form.products[findedIndex];

                    newProduct.error = product.error;

                    const newArray = form.products.slice();

                    newArray.splice(findedIndex, 1, newProduct);

                    form.products = newArray;
                });
            }
        }
    }
</script>
