<template>
    <div class="bg-aist-green py-9 text-white lg:py-20">
        <div class="container md:flex md:items-center">
            <div
                class="mb-6 w-full md:mb-0 md:mr-6 md:max-w-[330px] md:flex-none lg:mr-16 lg:max-w-[400px] xl:max-w-[665px]"
            >
                <NuxtPicture
                    :img-attrs="{
                        class: 'w-full aspect-square object-contain',
                    }"
                    :sizes="'330px lg:665px'"
                    src="/images/guy-picking-apples.png"
                    alt="С заботой о вас"
                    placeholder
                    loading="lazy"
                    :preload="true"
                />
            </div>

            <div class="">
                <TheTitleSmall
                    ref="titleNode"
                    class="mb-5 lg:mb-12"
                >
                    {{ props.title }}
                </TheTitleSmall>

                <div
                    ref="contentNode"
                    v-html="props.text"
                    :class="{
                        'after:absolute after:bottom-0 after:left-0 after:h-[28px] after:w-full after:bg-gradient-to-b after:from-transparent after:to-aist-green':
                            !showAll,
                        'h-[200px]': isMobile,
                    }"
                    class="prose relative max-w-none overflow-hidden text-white"
                ></div>

                <div
                    v-if="isMobile"
                    :class="{ invisible: showAll }"
                    class="mt-5"
                >
                    <button
                        @click="showAll = !showAll"
                        class="text-sm font-semibold"
                    >
                        Показать полностью...
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { gsap } from 'gsap';
    import type { ComponentPublicInstance } from 'vue';

    const props = defineProps<{
        title?: string;
        text?: string;
    }>();

    const isMobile = ref<boolean>(false);

    const showAll = ref<boolean>(false);
    const titleNode = ref<ComponentPublicInstance | null>(null);
    const contentNode = ref<HTMLDivElement | null>(null);

    onMounted(() => {
        isMobile.value = !window.matchMedia('(min-width: 768px)').matches;

        if (!isMobile.value) {
            showAll.value = true;
        }
    });

    watch(showAll, (value) => {
        if (!isMobile.value) {
            return;
        }

        const timeline = gsap.timeline();

        if (value === true) {
            timeline.to(contentNode.value!, {
                height: 'auto',
            });

            return;
        }

        timeline.to(contentNode.value!, {
            height: 200,
        });
    });
</script>
