import AistApi, { CalcBasketError } from '~/api/AistApi/AistApi';

export default async (options?: { server?: boolean; lazy?: boolean; immediate?: boolean }) => {
    const form: {
        products: {
            value: {
                id: string;
                count: number;
            }[];
            error: string;
        };
        deliveryType: {
            value: string;
            error: string;
        };
        paymentType: {
            value: string;
            error: string;
        };
        promocode: {
            value: string;
            error: string;
        };
    } = reactive({
        products: {
            value: [],
            error: '',
        },
        deliveryType: {
            value: '',
            error: '',
        },
        paymentType: {
            value: '',
            error: '',
        },
        promocode: {
            value: '',
            error: '',
        },
    });

    watch(
        () => form.promocode.value,
        () => {
            form.promocode.error = '';
        }
    );

    const response = await useAsyncData(
        'calc-price',
        async () => {
            try {
                const response = await AistApi.calcBasket({
                    products: form.products.value,
                    deliveryTypeId: form.deliveryType.value,
                    paymentTypeId: form.paymentType.value,
                    promocode: form.promocode.value,
                });

                if (response.message?.promocode) {
                    form.promocode.error = response.message.promocode;
                }

                return response;
            } catch (error) {
                throw new Error();
            }
        },
        options
    );

    return { response, form };
};
