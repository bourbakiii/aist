import AistApi from '~/api/AistApi/AistApi';

export default async (options?: { immediate?: boolean; lazy?: boolean; server?: boolean }) => {
    const response = await useAsyncData('get-user', () => AistApi.getUser(), options);

    return { response };
};
