<template>
    <header
        id="page-header"
        class="sticky left-0 top-0 z-30 w-full bg-white py-2 shadow lg:flex lg:h-[90px] lg:items-center lg:py-0"
    >
        <div class="container">
            <div class="flex items-center justify-between">
                <div>
                    <NuxtLink
                        href="/"
                        class="block"
                    >
                        <NuxtImg
                            :preload="true"
                            src="/images/logo.svg"
                            alt="Аист"
                            class="block w-28 2xl:w-[173px]"
                        />
                    </NuxtLink>
                </div>

                <div>
                    <BaseButton
                        @click="toggleCatalog"
                        :text="'Каталог'"
                        :leading-icon="'icon-catalog'"
                        :is-big="true"
                        :is-loading="showButtonLoading"
                    />
                </div>

                <div class="2xl:w-[510px]">
                    <SearchFormSelect />
                </div>

                <div class="text-xs 2xl:text-base">
                    <div class="flex items-center justify-end">
                        <i class="icon-phone mr-1 block text-[20px] text-aist-green"></i>

                        <a
                            href="#"
                            class="block whitespace-nowrap"
                        >
                            +7 (800) 333-44-55
                        </a>
                    </div>

                    <div class="mt-1 text-right font-semibold">Служба поддержки</div>
                </div>

                <div class="flex items-center gap-6">
                    <div>
                        <BaseButtonIcon
                            :to="'/favorite'"
                            :icon-class="'icon-heart'"
                            :is-outlined="true"
                            aria-label="Избранное"
                        />
                    </div>

                    <div>
                        <ModalAuthorization />
                    </div>

                    <div class="w-[175px]">
                        <ButtonBusket />
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <CatalogModalTransition>
                <CatalogModal
                    v-if="showCatalog"
                    :sections="sectionsToCatalogModalSections"
                    @close="showCatalog = false"
                />
            </CatalogModalTransition>
        </Teleport>
    </header>
</template>

<script setup lang="ts">
    import type { Section } from '~/api/AistApi/models/Section';
    import type { Section as CatalogModalSection } from './CatalogModal/CatalogModal.vue';
    import { useSectionsStore } from '~/stores/SectionsStore';

    const sectionsStore = useSectionsStore();

    const showCatalog = ref<boolean>(false);

    const showButtonLoading = ref(false);

    async function toggleCatalog() {
        if (showCatalog.value) {
            showCatalog.value = false;

            return;
        }

        if (sectionsStore.sections.length > 0) {
            showCatalog.value = true;

            return;
        }

        showButtonLoading.value = true;

        await sectionsStore.getSections();

        showButtonLoading.value = false;

        showCatalog.value = true;
    }

    const sectionsToCatalogModalSections = computed<CatalogModalSection[]>(() => {
        function parseSection(section: Section, parentUrl?: string): CatalogModalSection {
            const url = parentUrl ? `${parentUrl}/${section.slug}` : `/catalog/${section.slug}`;

            return {
                id: section.id,
                name: section.name,
                href: url,
                children: section.children.map((s) => parseSection(s, url)),
            };
        }

        return sectionsStore.sections.map((s) => parseSection(s)) ?? [];
    });
</script>
