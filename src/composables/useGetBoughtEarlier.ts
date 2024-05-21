import AistApi from '~/api/AistApi/AistApi';

export default async (
    options: {
        server?: boolean;
        lazy?: boolean;
        immediate?: boolean;
    } = {}
) => {
    const response = await useAsyncData(
        'get-bought-earlier',
        () => AistApi.getBoughtEarlier(),
        options
    );

    return { response };
};
