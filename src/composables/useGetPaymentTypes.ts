import AistApi from '~/api/AistApi/AistApi';

export default async (options?: { immediate?: boolean; lazy?: boolean; server?: boolean }) => {
    const response = await useAsyncData(
        'get-payment-types',
        () => AistApi.getPaymentTypes(),
        options
    );

    return { response };
};
