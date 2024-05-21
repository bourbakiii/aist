<template>
    <div>
        <div class="hidden lg:mb-6 lg:block">
            <div class="container">
                <BaseBreadcrumbs :links="breadcrumbs" />
            </div>
        </div>

        <div class="container">
            <div class="lg:flex">
                <div
                    v-if="props.product.images.length"
                    class="lg:mr-[48px]"
                >
                    <SliderProductsItem
                        :slides="
                            props.product.images.map((image, index) => ({
                                id: String(index),
                                img: {
                                    src: image,
                                    alt: props.product.name,
                                },
                            }))
                        "
                    />
                </div>

                <div class="mt-6 lg:mt-0">
                    <div>
                        <h1 class="text-[24px] font-bold lg:text-[48px]">
                            {{ props.product.name }}
                        </h1>

                        <span class="mt-1 text-[14px] font-semibold text-aist-grey">
                            {{ props.product.weight }}
                        </span>

                        <div
                            v-if="props.product.brand"
                            class="my-6"
                        >
                            <span class="text-base font-normal">Бренд: </span>

                            <span class="text-base font-semibold text-aist-green">
                                {{ props.product.brand.name }}
                            </span>
                        </div>

                        <span
                            v-if="discountPercent"
                            class="inline-block rounded-[10px] bg-aist-red px-2 py-1 text-xs font-semibold text-aist-white lg:text-base"
                        >
                            -{{ discountPercent }}%
                        </span>

                        <div class="mt-[15px] flex items-start">
                            <div
                                :class="{
                                    'text-aist-red': oldPrice,
                                }"
                                class="text-xl font-bold lg:text-[30px] lg:leading-normal"
                            >
                                {{ toRuPrice(price) }}
                            </div>

                            <div
                                v-if="oldPrice"
                                class="ml-2 text-xs font-normal text-aist-grey line-through lg:text-base"
                            >
                                {{ toRuPrice(oldPrice) }}
                            </div>
                        </div>

                        <div
                            v-if="props.product.priceOnline || props.product.minCount"
                            class="mb-4 mt-3"
                        >
                            <template v-if="props.product.priceOnline">
                                <span class="font-OpenSans text-lg font-semibold text-aist-black">
                                    {{ toRuPrice(props.product.priceOnline) }}
                                </span>

                                <span class="text-sm font-normal text-aist-black">
                                    при оплате банковской картой
                                </span>
                            </template>

                            <span
                                v-if="props.product.minCount"
                                class="mb-[12px] mt-[16px] block text-sm font-normal"
                            >
                                Минимальное количество:
                                <span class="text-sm font-semibold">
                                    {{ props.product.minCount }}
                                </span>
                            </span>
                        </div>

                        <div class="flex items-end">
                            <div class="mt-6 h-[46px] w-[180px] lg:mt-9">
                                <Transition
                                    enter-active-class="transition duration-[200ms]"
                                    leave-active-class="transition duration-[200ms]"
                                    enter-from-class="opacity-0"
                                    leave-to-class="opacity-0"
                                    mode="out-in"
                                >
                                    <BaseButton
                                        v-if="!inBasket"
                                        @click="addToCart"
                                        :text="'В корзину'"
                                        :is-big="true"
                                    />

                                    <BaseProductQuantityInput
                                        v-else
                                        v-model="countInBasket"
                                        :measure="product.unit"
                                        :adding-step="product.step"
                                        :set-focus-on-mounted="true"
                                        :stock="product.stock"
                                        :is-big="true"
                                    />
                                </Transition>
                            </div>

                            <div class="ml-6">
                                <ProductCardFavoriteButton
                                    :product="product"
                                    :is-big="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:mt-[64px] lg:flex">
                <div
                    v-if="props.product.description"
                    class="lg:mr-[48px] lg:w-[60%]"
                >
                    <div class="mt-[24px] block text-xl font-semibold text-aist-black">
                        Описание
                    </div>

                    <div
                        v-if="props.product.description"
                        v-html="props.product.description"
                        class="prose mt-[16px] max-w-none"
                    ></div>
                </div>

                <div class="mt-9 lg:w-[40%]">
                    <div class="mb-5 block text-xl font-semibold lg:mb-9">Характеристики</div>

                    <BaseProperties
                        :attributes="[
                            ...(props.product.brand
                                ? [
                                      {
                                          title: 'Бренд',
                                          value: props.product.brand.name,
                                          highlight: true,
                                      },
                                  ]
                                : []),
                            ...(props.product.manufacturer
                                ? [
                                      {
                                          title: 'Производитель',
                                          value: props.product.manufacturer.name,
                                      },
                                  ]
                                : []),
                        ]"
                    />
                </div>
            </div>
        </div>

        <TheSection
            v-if="
                getRelatedProductsStatus === 'idle' ||
                getRelatedProductsStatus === 'pending' ||
                (getRelatedProductsStatus === 'success' && relatedProducts?.length)
            "
            class="mb-0"
        >
            <div class="container">
                <div class="mb-4 lg:mb-9">
                    <TheTitleSmaller>Рекомендуем</TheTitleSmaller>
                </div>

                <SliderProducts>
                    <template
                        v-if="
                            getRelatedProductsStatus === 'idle' ||
                            getRelatedProductsStatus === 'pending'
                        "
                    >
                        <SliderProductsSlide
                            v-for="n in 6"
                            :key="n"
                        >
                            <ProductCardSkeleton />
                        </SliderProductsSlide>
                    </template>

                    <template v-else>
                        <SliderProductsSlide
                            v-for="product in relatedProducts ?? []"
                            :key="product.id"
                        >
                            <ProductCard :product="product" />
                        </SliderProductsSlide>
                    </template>
                </SliderProducts>
            </div>
        </TheSection>
    </div>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';
    import type { Product } from '~/api/AistApi/models/Product';
    import type { Breadcrumbs } from '~/api/AistApi/models/Breadcrumbs';
    import { useBasketStore } from '~/stores/BasketStore';
    import AistApi from '~/api/AistApi/AistApi';

    const props = defineProps<{
        product: Product;
        breadcrumbs: Breadcrumbs;
    }>();

    useSeoMeta({
        title: props.product.meta?.title ?? props.product.name,
        description: strapTags(
            props.product.meta?.description ?? props.product.description ?? ''
        ).slice(0, 155),
        ogTitle: props.product.meta?.title ?? props.product.name,
        ogDescription: strapTags(
            props.product.meta?.description ?? props.product.description ?? ''
        ).slice(0, 155),
        ogImage: props.product.meta?.ogImage,
    });

    const headerTitle = inject(headerTitleKey);

    headerTitle!.value = props.product.name;

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

    const price = computed(() => {
        return props.product.discountPrice ? props.product.discountPrice : props.product.price;
    });

    const oldPrice = computed(() => {
        return props.product.discountPrice ? props.product.price : false;
    });

    const discountPercent = computed(() => {
        const price = 100 - ((props.product.discountPrice ?? 0) / props.product.price) * 100;

        if (price === 100) {
            return false;
        }

        return price.toFixed(0);
    });

    useSchemaOrg([
        defineProduct({
            name: props.product.name,
            description: props.product.description,
            image: props.product.images,
            offers: [
                {
                    price: price.value,
                    priceCurrency: 'RUB',
                    availability: props.product.isAvailable
                        ? 'https://schema.org/InStock'
                        : 'https://schema.org/OutOfStock',
                },
            ],
            brand: {
                name: props.product.brand?.name,
            },
        }),
    ]);

    const basketStore = useBasketStore();

    const countInBasket = computed({
        get() {
            return basketStore.countInBasket(props.product.id);
        },
        set(newValue) {
            basketStore.changeProductCount(props.product, newValue);
        },
    });

    const inBasket = computed(() => {
        return countInBasket.value > 0;
    });

    function addToCart() {
        countInBasket.value = 1;
    }

    const { data: relatedProducts, status: getRelatedProductsStatus } = await useAsyncData(
        `get-related-products-${props.product.id}`,
        () => AistApi.getRelatedProducts(props.product.id),
        {
            server: false,
            lazy: false,
        }
    );
</script>
