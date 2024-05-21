<template>
    <div
        @click.self="emit('close')"
        class="fixed left-0 top-0 z-[25] h-full w-full bg-black/60 pt-[68px] before:fixed before:left-0 before:top-0 before:h-full before:w-[calc((100vw_-_1024px)_/_2)] before:bg-white xl:before:w-[calc((100vw_-_1280px)_/_2)] 2xl:pt-[90px] 2xl:before:w-[calc((100vw_-_1440px)_/_2)]"
    >
        <div class="container pointer-events-none relative h-full w-full">
            <TransitionGroup
                enter-active-class="transition duration-[300ms] ease-out"
                enter-from-class="-translate-x-full"
                leave-active-class="transition duration-[300ms] ease-in"
                leave-to-class="-translate-x-full opacity-0"
            >
                <div
                    v-for="(categories, index) in openedCategories"
                    :key="categories.id"
                    :class="{ 'pl-4 xl:pl-9': index !== 0 }"
                    class="pointer-events-auto absolute left-0 top-0 h-full w-1/4 overflow-auto bg-white py-16 pr-4 xl:pr-9"
                    :style="[`z-index: ${100 - index}; left: calc(${index} * 25%);`]"
                >
                    <template v-if="categories.name">
                        <div class="text-[20px] font-semibold">
                            {{ categories.name }}
                        </div>

                        <div class="my-[24px] h-[1px] bg-aist-grey-light"></div>
                    </template>

                    <ul class="space-y-[24px]">
                        <li
                            v-for="link in categories.categories"
                            :id="link.id"
                        >
                            <CatalogModalLinkButton
                                @close="emit('close')"
                                @arrow-click="
                                    () => {
                                        if (openedCategories.find((c) => c.id === link.id)) {
                                            openedCategories = openedCategories.slice(0, index + 1);

                                            return;
                                        }

                                        openedCategories = openedCategories.slice(0, index + 1);

                                        openedCategories.push({
                                            id: link.id,
                                            name: link.name,
                                            categories: link.children!,
                                        });
                                    }
                                "
                                :to="link.href"
                                :hide-arrow="!!link.children?.length"
                            >
                                {{ link.name }}
                            </CatalogModalLinkButton>
                        </li>
                    </ul>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
    const emit = defineEmits<{
        close: [];
    }>();

    export interface Section {
        id: string;
        name: string;
        href: string;
        children?: Section[];
    }

    const props = defineProps<{
        sections: Section[] | null;
    }>();

    interface SectionGroup {
        id: string;
        name?: string;
        categories: Section[];
    }

    const openedCategories = ref<SectionGroup[]>([
        { id: 'main', categories: props.sections ?? [] },
    ]);

    onMounted(() => {
        document.body.classList.add('overflow-hidden');
    });

    onUnmounted(() => {
        document.body.classList.remove('overflow-hidden');
    });
</script>
