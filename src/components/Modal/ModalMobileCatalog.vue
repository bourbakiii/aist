<template>
    <BaseModalMobilePage
        @back="screenSlider!.slideBack()"
        :title="slideTitle ?? 'Каталог'"
        :show-back-button="canGoBack"
    >
        <div class="my-9">
            <ScreenSliderWrapper ref="screenSliderWrapper">
                <ScreenSliderSlide
                    v-for="categoryType in allCategories"
                    :id="categoryType[0].parentId ?? 'main'"
                    :title="categoryType[0].parentName"
                >
                    <div class="container">
                        <ul class="space-y-4">
                            <li
                                v-for="category in categoryType"
                                :key="category.id"
                                class="flex items-center gap-1"
                            >
                                <NuxtLink
                                    :to="category.url"
                                    class="block w-full overflow-hidden text-ellipsis rounded-[10px] px-4 py-3 text-base font-semibold transition duration-200 hover:bg-aist-grey-light focus:bg-aist-grey-light"
                                >
                                    {{ category.name }}
                                </NuxtLink>

                                <button
                                    v-if="category.hasChildren"
                                    @click="screenSlider!.slideTo(category.id)"
                                    class="h-[48px] w-[48px] flex-none rounded-[10px] text-[20px] hover:bg-aist-grey-light focus:bg-aist-grey-light"
                                >
                                    <i class="icon-chevron-right-big block"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </ScreenSliderSlide>
            </ScreenSliderWrapper>
        </div>
    </BaseModalMobilePage>
</template>

<script setup lang="ts">
    import ScreenSlider from '~/utils/ScreenSlider/ScreenSlider';
    import type { ScreenSliderWrapper } from '#components';

    export interface Category {
        id: string;
        name: string;
        slug: string;
        children?: Category[];
    }

    const props = defineProps<{
        categories: Category[];
    }>();

    interface ParsedCategory {
        id: string;
        name: string;
        hasChildren: boolean;
        url: string;
        parentId?: string;
        parentName?: string;
    }

    const allCategories = computed(() => {
        function parseCategory(
            categories: Category[],
            parentId?: string,
            parentName?: string,
            parentUrl?: string
        ) {
            const array: ParsedCategory[] = [];
            let sideArray: ParsedCategory[][] = [];

            categories.forEach((category) => {
                const url = parentUrl
                    ? `${parentUrl}/${category.slug}`
                    : `/catalog/${category.slug}`;

                array.push({
                    id: category.id,
                    name: category.name,
                    hasChildren: !!category.children?.length,
                    url: url,
                    parentId: parentId,
                    parentName: parentName,
                });

                if (category.children?.length) {
                    sideArray.push(
                        ...parseCategory(category.children, category.id, category.name, url)
                    );
                }
            });

            return [array, ...sideArray];
        }

        return parseCategory(props.categories);
    });

    let screenSlider: ScreenSlider | null = null;
    const screenSliderWrapper = ref<InstanceType<typeof ScreenSliderWrapper> | null>(null);

    const slideTitle = ref<string | null>(null);
    const canGoBack = ref<boolean>(false);

    onMounted(() => {
        screenSlider = new ScreenSlider(screenSliderWrapper.value!.$el, {
            onScreenChange: () => {
                slideTitle.value = screenSlider!.currentSlide.title ?? null;
                canGoBack.value = screenSlider!.canGoBack;
            },
        });
    });
</script>
