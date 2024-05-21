<template>
    <div>
        <TheSection v-if="mainPage?.modules.slider.slides.length">
            <div class="container">
                <SliderMain
                    :slides="
                        mainPage?.modules.slider.slides.map((s, i) => ({
                            id: String(i),
                            img: {
                                src: s.imageSrc,
                                alt: s.alt,
                            },
                        }))
                    "
                />
            </div>
        </TheSection>

        <TheSection
            v-if="userStore.isAuthenticated"
            :tag="'div'"
        >
            <div class="container">
                <template
                    v-if="getBoughtEarlierStatus === 'idle' || getBoughtEarlierStatus === 'pending'"
                >
                    <SkeletonProductsSlider />
                </template>

                <template v-else>
                    <div class="mb-4 lg:mb-9">
                        <TheTitleSmaller>Недавние покупки</TheTitleSmaller>
                    </div>

                    <SliderProducts v-if="boughtEarlier">
                        <SliderProductsSlide
                            v-for="product in boughtEarlier"
                            :key="product.id"
                        >
                            <ProductCard :product="product" />
                        </SliderProductsSlide>
                    </SliderProducts>
                </template>
            </div>
        </TheSection>

        <template v-if="getMainPageSections === 'idle' || getMainPageSections === 'pending'">
            <div
                v-for="n in 3"
                :key="n"
                class="container"
            >
                <TheSection :tag="'div'">
                    <SkeletonProductsSlider />
                </TheSection>
            </div>
        </template>

        <template v-else>
            <TheSection
                v-for="section in mainPageSections ?? []"
                :key="section.id"
            >
                <div class="container">
                    <div class="mb-4 flex items-center justify-between lg:mb-9 lg:items-baseline">
                        <TheTitleSmaller>{{ section.name }}</TheTitleSmaller>

                        <div class="flex-none lg:hidden">
                            <BaseButtonIconGrey
                                :to="generateUrl(section)"
                                :aria-label="`Перейти к секции ${section.name}`"
                            />
                        </div>

                        <div class="hidden lg:block">
                            <NuxtLink
                                :to="generateUrl(section)"
                                class="font-semibold text-aist-green hover:underline focus:underline"
                            >
                                Смотреть всё
                            </NuxtLink>
                        </div>
                    </div>

                    <SliderProducts>
                        <SliderProductsSlide
                            v-for="product in section.products"
                            :key="product.id"
                        >
                            <ProductCard :product="product" />
                        </SliderProductsSlide>
                    </SliderProducts>
                </div>
            </TheSection>
        </template>

        <TheSection>
            <div class="container">
                <LazyBannerLoyaltyCard :text="mainPage?.modules.loyaltyBanner.text" />
            </div>
        </TheSection>

        <TheSection>
            <LazyBannerAboutUs
                :title="mainPage?.modules.aboutUs.title"
                :text="mainPage?.modules.aboutUs.content"
            />
        </TheSection>

        <TheSection>
            <div class="container">
                <TheTitleSmaller class="mb-5 lg:mb-9">Категории</TheTitleSmaller>

                <div
                    class="space-y-4 md:grid md:grid-cols-2 md:items-start md:gap-4 md:space-y-0 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8"
                >
                    <template
                        v-if="
                            sectionsStore.getSectionsStatus === 'idle' ||
                            sectionsStore.getSectionsStatus === 'pending'
                        "
                    >
                        <LazyCategoryCardSkeleton
                            v-for="n in 6"
                            :key="n"
                        />
                    </template>

                    <template v-else-if="sectionsStore.sections.length">
                        <LazyCategoryCard
                            v-for="section in sectionsStore.sections"
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
                    </template>
                </div>
            </div>
        </TheSection>
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';
    import type { MainPage } from '~/api/AistApi/models/MainPage';
    import { useUserStore } from '~/stores/UserStore';
    import type { Section } from '~/api/AistApi/models/Section';
    import { useSectionsStore } from '~/stores/SectionsStore';

    const sectionsStore = useSectionsStore();

    onMounted(() => {
        sectionsStore.getSections();
    });

    const nuxtApp = useNuxtApp();

    const { data: mainPage } = await useAsyncData<MainPage>(
        'get-main-page',
        () => AistApi.getMainPage(),
        {
            getCachedData(key) {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
            },
        }
    );

    useSeoMeta({
        title: mainPage.value!.meta.title,
        description: mainPage.value!.meta.description,
        ogTitle: mainPage.value!.meta.title,
        ogDescription: mainPage.value!.meta.description,
        ogImage: mainPage.value!.meta.ogImage,
    });

    const userStore = useUserStore();

    const {
        response: { data: boughtEarlier, status: getBoughtEarlierStatus },
    } = await useGetBoughtEarlier({
        server: false,
        lazy: false,
        immediate: userStore.isAuthenticated,
    });

    const {
        response: { data: mainPageSections, status: getMainPageSections },
    } = await useGetMainPageSections({
        server: false,
        lazy: false,
    });

    function generateUrl(section: Section) {
        function recursiveFun(section: Section, prevUrl?: string) {
            let url: string;

            if (prevUrl) {
                url = `${section.slug}/${prevUrl}`;
            } else {
                url = `${section.slug}`;
            }

            if (section.parent) {
                url = `${recursiveFun(section.parent, url)}`;
            }

            return url;
        }

        return `/catalog/${recursiveFun(section)}`;
    }
</script>
