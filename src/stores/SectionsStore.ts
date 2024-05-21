import { defineStore } from 'pinia';
import AistApi from '~/api/AistApi/AistApi';
import type { Section } from '~/api/AistApi/models/Section';

export const useSectionsStore = defineStore('sections', () => {
    const sections = ref<Section[]>([]);

    const getSectionsStatus = ref<'idle' | 'pending' | 'success' | 'error'>('idle');

    async function getSections() {
        if (getSectionsStatus.value === 'pending') {
            return;
        }

        getSectionsStatus.value = 'pending';

        try {
            sections.value = await AistApi.getSections();

            getSectionsStatus.value = 'success';
        } catch (error) {
            getSectionsStatus.value = 'error';
        }
    }

    return { sections, getSectionsStatus, getSections };
});
