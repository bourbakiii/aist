import { defineStore } from 'pinia';
import type { Product } from '~/api/AistApi/models/Product';
import type { ProductBasket } from '~/api/AistApi/models/ProductBasket';
import AistApi from '~/api/AistApi/AistApi';
import { useUserStore } from '~/stores/UserStore';
import debounce from 'lodash/debounce';

export const useBasketStore = defineStore('basket', () => {
    const userStore = useUserStore();

    const basket = useCookie('basket', {
        default: () => ref<ProductBasket[]>([]),
    });

    const promocode = ref<string>('');

    const totalPrice = computed(() => {
        let price = 0;

        basket.value.forEach((product) => {
            price += (product.discountPrice ?? product.price) * product.basketFields.count;
        });

        return price;
    });

    const totalPriceWithoutDiscount = computed(() => {
        let price = 0;

        basket.value.forEach((product) => {
            price += product.price * product.basketFields.count;
        });

        return price;
    });

    const totalDiscount = computed(() => {
        return totalPriceWithoutDiscount.value - totalPrice.value;
    });

    const onlineTotalPrice = computed(() => {
        let price = 0;

        basket.value.forEach((product) => {
            price += (product.priceOnline ?? product.price) * product.basketFields.count;
        });

        return price;
    });

    function changeProductCount(product: Product, count: number) {
        if (count < 0) {
            count = 0;
        }

        if (count * product.step > product.stock) {
            return;
        }

        const productInBasketIndex = basket.value.findIndex((p) => p.id == product.id);

        let productBasket: ProductBasket;

        if (productInBasketIndex === -1) {
            productBasket = {
                ...product,
                basketFields: {
                    count,
                },
            };
        } else {
            const currentProductInBasket = basket.value[productInBasketIndex];

            productBasket = {
                ...product,
                basketFields: {
                    itemId: currentProductInBasket.basketFields.itemId,
                    count,
                },
            };
        }

        const newBasket = basket.value.slice();

        if (productInBasketIndex === -1) {
            if (count === 0) {
            } else {
                newBasket.push(productBasket);
            }
        } else {
            if (count === 0) {
                newBasket.splice(productInBasketIndex, 1);
            } else {
                newBasket.splice(productInBasketIndex, 1, productBasket);
            }
        }

        basket.value = newBasket;

        setProductCountInRemoteBasket(productBasket, count);
    }

    const setProductCountInRemoteBasket = debounce(
        async (product: ProductBasket, count: number) => {
            if (userStore.isAuthenticated === false) {
                return;
            }

            if (count === 0) {
                if (product.basketFields.itemId) {
                    await AistApi.removeProductFromBasket(product.basketFields.itemId!);
                }

                return;
            }

            const productBasketId = await AistApi.setProductInBasket(product.id, count);

            basket.value[getProductInBasketIndex(product.id)].basketFields.itemId = productBasketId;
        },
        500
    );

    async function removeFromBasket(productId: string) {
        const newBasket = basket.value.slice();

        const productInBasketIndex = getProductInBasketIndex(productId);

        if (productInBasketIndex === -1) {
            return;
        }

        const product = basket.value[productInBasketIndex];

        newBasket.splice(productInBasketIndex, 1);

        basket.value = newBasket;

        if (userStore.isAuthenticated && product.basketFields.itemId) {
            await AistApi.removeProductFromBasket(product.basketFields.itemId!);
        }
    }

    function getProductInBasketIndex(productId: string) {
        return basket.value.findIndex((p) => p.id == productId);
    }

    function countInBasket(productId: string): number {
        const productInBasketIndex = basket.value.findIndex((p) => p.id == productId);

        if (productInBasketIndex !== -1) {
            return basket.value.at(productInBasketIndex)!.basketFields.count;
        }

        return 0;
    }

    async function mergeBasket() {
        try {
            await AistApi.mergeBasket(
                basket.value.map((p) => ({
                    id: p.id,
                    count: p.basketFields.count,
                }))
            );
        } catch (e) {}
    }

    async function getBasket() {
        const products = await AistApi.getBasket();

        basket.value = products;
    }

    async function dropBasket() {
        await AistApi.deleteBusket();
        basket.value = [];
    }

    return {
        basket,
        promocode,
        totalPrice,
        onlineTotalPrice,
        totalPriceWithoutDiscount,
        totalDiscount,
        changeProductCount,
        countInBasket,
        getBasket,
        mergeBasket,
        removeFromBasket,
        dropBasket,
    };
});
