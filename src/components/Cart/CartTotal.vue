<template>
    <div class="rounded-[10px] bg-white px-6 py-9 shadow-aist">
        <div>
            <div>
                <ul class="space-y-4">
                    <template
                        v-for="attribute in props.attributes"
                        :key="attribute.id"
                    >
                        <li
                            v-if="attribute.value"
                            class="flex items-end justify-between gap-4"
                        >
                            <div>{{ attribute.name }}</div>

                            <div class="font-semibold">{{ attribute.value }}</div>
                        </li>
                    </template>
                </ul>

                <div class="mt-4">
                    <div>
                        <BaseAlertWrapper
                            :type="'error'"
                            :show="!!props.promocodeError"
                            :absolute="false"
                        >
                            <BaseInput
                                v-model="promocode"
                                :placeholder="'Промокод'"
                                :error="!!props.promocodeError"
                            />

                            <template #message>
                                <div class="mt-2">
                                    {{ props.promocodeError }}
                                </div>
                            </template>
                        </BaseAlertWrapper>
                    </div>

                    <div
                        v-if="props.promocodeDiscount"
                        class="mt-4 flex items-end justify-between gap-4"
                    >
                        <div>Промокод</div>

                        <div class="font-semibold">-{{ toRuPrice(props.promocodeDiscount) }}</div>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <div class="flex items-end justify-between text-lg font-semibold">
                    <div>Итого</div>

                    <div class="text-aist-red">
                        {{ toRuPrice(props.totalPrice) }}
                    </div>
                </div>

                <div
                    v-if="props.totalPriceByCard"
                    class="mt-3"
                >
                    <div>
                        <b>{{ toRuPrice(props.totalPriceByCard) }}</b> при оплате картой
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <BaseButton
                    @click="emit('checkoutClick')"
                    :text="'Оформить заказ'"
                    :is-big="true"
                    :is-loading="props.isPending"
                />
            </div>

            <div
                v-if="props.showChangeOrder"
                class="mt-3"
            >
                <BaseButton
                    @click="emit('changeOrderClick')"
                    :text="'Изменить заказ'"
                    :is-outlined="true"
                    :is-big="true"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import debounce from 'lodash/debounce';

    const props = defineProps<{
        attributes: {
            id: string;
            name: string;
            value?: string;
        }[];
        totalPrice: number;
        promocode?: string;
        totalPriceByCard?: number;
        showChangeOrder?: boolean;
        promocodeDiscount?: number;
        promocodeError?: string;
        isPending?: boolean;
    }>();

    const emit = defineEmits<{
        sendPromocode: [value: string];
        checkoutClick: [];
        changeOrderClick: [];
    }>();

    const promocode = ref<string>(props.promocode ?? '');

    const debouncedEmitSendPromocode = debounce(() => {
        emit('sendPromocode', promocode.value);
    }, 1000);

    watch(promocode, () => {
        debouncedEmitSendPromocode();
    });
</script>
