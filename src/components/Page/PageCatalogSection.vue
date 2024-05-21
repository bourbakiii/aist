<template>
    <div>
        <div class="hidden lg:mb-6 lg:block">
            <div class="container">
                <BaseBreadcrumbs :links="breadcrumbs" />
            </div>
        </div>

        <div class="container">
            <div class="mb-6 flex items-baseline justify-between gap-4 lg:mb-9 lg:justify-start">
                <TheTitleSmall :tag="'h1'"> {{ section!.name }} </TheTitleSmall>

                <div class="whitespace-nowrap text-sm lg:text-base">
                    {{ section!.productsCount }} товаров
                </div>
            </div>

            <div class="flex justify-between lg:hidden">
                <BaseInlineButton
                    @click="showFilterModal = true"
                    :leading-icon="'icon-filter'"
                >
                    Фильтры
                </BaseInlineButton>

                <BaseInlineButton
                    @click="showSortModal = true"
                    :leading-icon="'icon-sort'"
                >
                    Сортировка
                </BaseInlineButton>
            </div>

            <div class="rounded-[10px] lg:grid lg:grid-cols-4 lg:gap-5">
                <div class="mb-4 lg:col-span-1 lg:mb-0">
                    <Teleport
                        to="body"
                        :disabled="!isMobile"
                    >
                        <component
                            :is="isMobile ? BaseAdaptiveModal : 'div'"
                            @back="showFilterModal = false"
                            :show="isMobile ? showFilterModal : undefined"
                            :title="isMobile ? 'Фильтры' : undefined"
                            class="lg:sticky lg:left-0 lg:top-[114px] lg:w-full lg:rounded-[10px] lg:bg-white lg:p-6"
                        >
                            <div
                                :class="{ container: isMobile }"
                                class="space-y-6 xl:space-y-9"
                            >
                                <div>
                                    <TheTitleSmaller class="mb-4">Каталог</TheTitleSmaller>

                                    <CatalogSections
                                        :sections="sectionsToCatalogSectionsSections"
                                    />
                                </div>
                            </div>
                        </component>
                    </Teleport>
                </div>

                <div class="lg:col-span-3">
                    <div class="hidden lg:mb-6 lg:flex lg:items-center lg:gap-4">
                        <div>
                            <BaseSortSwitch
                                v-model="sortType"
                                :first-value="{
                                    name: 'price',
                                    type: 'desc',
                                }"
                                :second-value="{
                                    name: 'price',
                                    type: 'asc',
                                }"
                                :compare-function="
                                    (currentValue, value) => {
                                        return shallowEqual(currentValue, value);
                                    }
                                "
                            >
                                По цене
                            </BaseSortSwitch>
                        </div>

                        <div>
                            <BaseSortSwitch
                                v-model="sortType"
                                :first-value="{
                                    name: 'discount',
                                    type: 'desc',
                                }"
                                :second-value="{
                                    name: 'discount',
                                    type: 'asc',
                                }"
                                :compare-function="
                                    (currentValue, value) => {
                                        return shallowEqual(currentValue, value);
                                    }
                                "
                            >
                                По размеру скидки
                            </BaseSortSwitch>
                        </div>

                        <div>
                            <BaseSortSwitch
                                v-model="sortType"
                                :first-value="{
                                    name: 'name',
                                    type: 'desc',
                                }"
                                :second-value="{
                                    name: 'name',
                                    type: 'asc',
                                }"
                                :compare-function="
                                    (currentValue, value) => {
                                        return shallowEqual(currentValue, value);
                                    }
                                "
                            >
                                По названию
                            </BaseSortSwitch>
                        </div>
                    </div>

                    <template v-if="getProductsState === 'pending' && showMore === false">
                        <div class="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-3 lg:gap-5">
                            <div
                                v-for="n in 6"
                                :key="n"
                            >
                                <ProductCardSkeleton />
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <div
                            v-if="products.length"
                            class="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-3 lg:gap-5"
                        >
                            <div
                                v-for="product in products"
                                :key="product.id"
                            >
                                <ProductCard
                                    :product="product"
                                    :to="`${route.path}/${product.slug}`"
                                />
                            </div>

                            <template v-if="getProductsState === 'pending' && showMore === true">
                                <div
                                    v-for="n in 6"
                                    :key="n"
                                >
                                    <ProductCardSkeleton />
                                </div>
                            </template>
                        </div>

                        <NotFound v-else>
                            <template #message>
                                По данным критериям не найдено ни одного товара.<br />
                                Попробуйте изменить фильтры или выбрать другую категорию
                            </template>
                        </NotFound>
                    </template>

                    <div
                        v-if="lastPage && page <= lastPage && lastPage > 1"
                        class="mt-6"
                    >
                        <ThePagination
                            v-model="page"
                            :last-page="lastPage"
                            :is-loading="getProductsState === 'pending'"
                        />
                    </div>

                    <div
                        v-if="
                            page < (lastPage ?? 0) ||
                            (page === lastPage &&
                                (getProductsState === 'pending' || !!timeoutGetProducts) &&
                                showMore === true)
                        "
                        class="mt-6 flex justify-center"
                    >
                        <div>
                            <BaseButton
                                @click="
                                    page++;
                                    showMore = true;
                                "
                                :is-big="true"
                                :is-loading="
                                    (getProductsState === 'pending' || !!timeoutGetProducts) &&
                                    showMore === true
                                "
                                text="Показать ещё"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <BaseBottomModal
                @close="showSortModal = false"
                :show="showSortModal"
            >
                <template #header> Сортировка </template>

                <template #default>
                    <div class="container">
                        <ul
                            class="divide-y [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-4"
                        >
                            <li
                                v-for="radio in radioSorts"
                                :key="radio.id"
                            >
                                <BaseRadio
                                    v-model="sortType"
                                    :value="{
                                        name: radio.sortName,
                                        type: radio.sortType,
                                    }"
                                >
                                    <div
                                        :class="{
                                            'font-semibold':
                                                radio.sortName === sortType?.name &&
                                                radio.sortType === sortType?.type,
                                        }"
                                    >
                                        {{ radio.name }}
                                    </div>
                                </BaseRadio>
                            </li>
                        </ul>
                    </div>
                </template>
            </BaseBottomModal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import type { Product } from '~/api/AistApi/models/Product';
    import AistApi from '~/api/AistApi/AistApi';
    import type { Section } from '~/api/AistApi/models/Section';
    import type { Breadcrumbs } from '~/api/AistApi/models/Breadcrumbs';
    import type { Section as CatalogSectionsSection } from '~/components/Catalog/CatalogSections/CatalogSections.vue';
    import { BaseAdaptiveModal } from '#components';
    import headerTitleKey from '~/keys/headerTitleKey';

    const props = defineProps<{
        section: Section;
        breadcrumbs: Breadcrumbs;
    }>();

    const route = useRoute();
    const nuxtApp = useNuxtApp();

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = props.section.name;

    const breadcrumbs = [
        { name: 'Главная', item: '/' },
        { name: 'Каталог', item: '/catalog' },
        ...props.breadcrumbs.reduce(
            (breadcrumbs, breadcrumb, index) => {
                breadcrumbs.push({
                    name: breadcrumb.name,
                    item: breadcrumbs.at(index - 1)
                        ? `${breadcrumbs.at(index - 1)!.item}/${breadcrumb.slug}`
                        : `/catalog/${breadcrumb.slug}`,
                });

                return breadcrumbs;
            },
            [] as {
                name: string;
                item: string;
            }[]
        ),
    ];

    useSchemaOrg([
        defineBreadcrumb({
            itemListElement: breadcrumbs,
        }),
    ]);

    useSeoMeta({
        title: props.section.meta.title ?? props.section.name,
        description: props.section.meta.description ?? props.section.description,
        ogTitle: props.section.meta.title ?? props.section.name,
        ogDescription: props.section.meta.description ?? props.section.description,
        ogImage: props.section.meta.image,
    });

    const { isMobile } = useMobile();

    const showFilterModal = ref<boolean>(false);
    const showSortModal = ref<boolean>(false);

    const { data: sections } = await useGetAllSections();

    const sectionsToCatalogSectionsSections = computed<CatalogSectionsSection[]>(() => {
        function parseSection(sct: Section, parentSlug?: string): CatalogSectionsSection {
            const to = parentSlug ? `${parentSlug}/${sct.slug}` : `/catalog/${sct.slug}`;

            return {
                id: sct.id,
                name: sct.name,
                to: to,
                active: !!props.breadcrumbs.find((breadcrumb) => {
                    return breadcrumb.slug === sct.slug;
                }),
                current: props.section.slug === sct.slug,
                children: sct.children.map((s) => parseSection(s, to)),
            };
        }

        return sections.value?.map((s) => parseSection(s)) ?? [];
    });

    const router = useRouter();

    const page = computed({
        get() {
            return Number(route.query.page ?? 1);
        },

        set(value) {
            if (getProductsState.value === 'pending') {
                return;
            }

            router.push({ query: { ...route.query, page: value } });
        },
    });

    type SortName = 'name' | 'price' | 'discount';

    type SortType = 'asc' | 'desc';

    const radioSorts: {
        id: string;
        name: string;
        sortName: SortName;
        sortType: SortType;
    }[] = [
        {
            id: '0',
            name: 'По цене',
            sortName: 'price',
            sortType: 'asc',
        },
        {
            id: '1',
            name: 'По скидке',
            sortName: 'discount',
            sortType: 'asc',
        },
        {
            id: '3',
            name: 'По названию',
            sortName: 'name',
            sortType: 'asc',
        },
    ];

    const sortType = ref<{
        name: SortName;
        type: SortType;
    } | null>(null);

    let sortTimer: NodeJS.Timeout | null = null;

    const debouncedSortType = ref<{
        name: SortName;
        type: SortType;
    } | null>(null);

    watch(
        sortType,
        () => {
            if (sortTimer) {
                clearTimeout(sortTimer);
            }

            sortTimer = setTimeout(() => {
                debouncedSortType.value = sortType.value;
            }, 1000);
        },
        {}
    );

    watch(debouncedSortType, () => {
        page.value = 1;
    });

    const {
        data: productsData,
        status: getProductsState,
        execute: getProducts,
    } = await useAsyncData<[Product[], number]>(
        `catalog-section-${props.section.id}-products-page-${page.value}`,
        () =>
            AistApi.getSectionProducts(
                props.section.id,
                6,
                page.value,
                debouncedSortType.value?.name,
                debouncedSortType.value?.type
            )
    );

    let timeoutGetProducts: NodeJS.Timeout | null = null;

    watch(page, executeGetProducts);

    watch(debouncedSortType, executeGetProducts);

    function executeGetProducts() {
        if (timeoutGetProducts) {
            clearTimeout(timeoutGetProducts);
        }

        timeoutGetProducts = setTimeout(() => {
            getProducts();
        }, 100);
    }

    const currentProducts = computed(() => {
        return productsData.value?.[0];
    });

    const lastPage = computed(() => {
        return productsData.value?.[1];
    });

    const showMore = ref(false);

    const products = ref<Product[]>([]);

    watch(
        currentProducts,
        () => {
            if (showMore.value) {
                products.value.push(...(currentProducts.value ?? []));

                showMore.value = false;

                return;
            }

            products.value = (currentProducts.value ?? []).slice();
        },
        {
            immediate: true,
        }
    );
</script>
