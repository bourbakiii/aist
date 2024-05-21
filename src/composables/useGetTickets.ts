import AistApi from '~/api/AistApi/AistApi';

export default async (
    days: number,
    options?: {
        immediate?: boolean;
        lazy?: boolean;
        server?: boolean;
    }
) => {
    const response = await useAsyncData('get-tickets', () => AistApi.getSlots(days), options);

    return { response };
};
