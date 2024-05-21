import AistApi from '~/api/AistApi/AistApi';
import type { Section } from '~/api/AistApi/models/Section';

export default async (options: { server?: boolean } = {}) => {
    const nuxtApp = useNuxtApp();

    const { data, status } = await useAsyncData<Section[]>(
        'get-all-sections',
        () => AistApi.getSections(),
        {
            getCachedData(key) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            },
            ...options,
        }
    );

    return { data, status };
};
