<template>
    <div>
        <div class="hidden lg:mb-6 lg:block">
            <div class="container">
                <BaseBreadcrumbs :links="breadcrumbs" />
            </div>
        </div>

        <div class="container hidden lg:block">
            <div class="mb-9 flex items-baseline gap-4">
                <TheTitleSmall>Все товары</TheTitleSmall>

                <div>{{ sections?.length ?? 0 }} категорий</div>
            </div>

            <div
                v-if="sections?.length"
                class="grid grid-cols-3 gap-x-6 gap-y-8"
            >
                <CategoryCard
                    v-for="section in sections"
                    :key="section.id"
                    :title="section.name"
                    :slug="section.slug"
                    :links="
                        section.children.map((s) => ({
                            id: s.id,
                            title: s.name,
                            href: `/catalog/${section.slug}/${s.slug}`,
                        }))
                    "
                    :img="
                        section.image
                            ? {
                                  src: section.image,
                                  alt: section.name,
                              }
                            : undefined
                    "
                />
            </div>

            <div v-else>
                <PlaceholderText> Пока <b>нет</b> никаких <b>категорий</b> </PlaceholderText>
            </div>
        </div>

        <Teleport to="body">
            <ModalMobileCatalog
                v-if="isMobile === true"
                :categories="sectionsToModalMobileCatalogCategories"
                class="lg:hidden"
            />
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';
    import type { Section } from '~/api/AistApi/models/Section';
    import type { Category as ModalMobileCatalogCategory } from '~/components/Modal/ModalMobileCatalog.vue';

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = 'Каталог';

    const breadcrumbs = [{ name: 'Главная', item: '/' }, { name: 'Каталог' }];

    useSchemaOrg([
        defineBreadcrumb({
            itemListElement: breadcrumbs,
        }),
        defineWebPage({
            name: 'Каталог',
        }),
    ]);

    definePageMeta({
        layout: 'inner',
    });

    useSeoMeta({
        title: 'Каталог',
    });

    const { isMobile } = useMobile();

    const { data: sections } = await useGetAllSections();

    const sectionsToModalMobileCatalogCategories = computed<ModalMobileCatalogCategory[]>(() => {
        function parseSection(section: Section): ModalMobileCatalogCategory {
            return {
                id: section.id,
                name: section.name,
                slug: section.slug,
                children: section.children.map((s) => parseSection(s)),
            };
        }

        return sections.value?.map((s) => parseSection(s)) ?? [];
    });
</script>
