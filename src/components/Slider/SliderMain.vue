<template>
    <div class="relative">
        <div
            ref="swiperNode"
            class="swiper group/swiper -m-4 p-4"
        >
            <div
                class="swiper-wrapper group-[&:not(.swiper-initialized)]/swiper:space-x-4 md:group-[&:not(.swiper-initialized)]/swiper:-space-x-[50px]"
            >
                <div
                    v-for="(slide, index) in props.slides"
                    :key="slide.id"
                    class="swiper-slide group md:w-[530px] lg:w-[750px] xl:w-[1000px]"
                >
                    <NuxtPicture
                        :src="slide.img.src"
                        :alt="slide.img.alt"
                        :img-attrs="{
                            class: 'aspect-[21/9] w-full rounded-[10px] object-cover shadow md:scale-[0.8] md:opacity-50 md:transition md:duration-300 md:group-[&.swiper-slide-active]:scale-100 md:group-[&.swiper-slide-active]:opacity-100 md:group-[&:not(.swiper-initialized)]/swiper:group-first-of-type:scale-100 md:group-[&:not(.swiper-initialized)]/swiper:group-first-of-type:opacity-100',
                        }"
                        :preload="index < 1"
                        :loading="index > 1 ? 'lazy' : undefined"
                        :sizes="'400px sm:540px lg:1000px'"
                    />
                </div>
            </div>

            <div
                v-if="props.slides.length > 1"
                class="mt-4 lg:mt-6"
            >
                <SwiperPagination
                    :slides="props.slides.length"
                    :active-slide="activeSwiperIndex"
                />
            </div>
        </div>

        <template v-if="props.slides.length > 1">
            <div
                class="z-10 hidden lg:absolute lg:left-0 lg:top-1/2 lg:block lg:-translate-y-1/2 2xl:-left-[32px] 2xl:-translate-x-full"
            >
                <SwiperButton
                    @click="swiper?.slidePrev()"
                    :direction="'left'"
                    :disabled="prevSlideDisable"
                />
            </div>

            <div
                class="z-10 hidden lg:absolute lg:right-0 lg:top-1/2 lg:block lg:-translate-y-1/2 2xl:-right-[32px] 2xl:translate-x-full"
            >
                <SwiperButton
                    @click="swiper?.slideNext()"
                    :direction="'right'"
                    :disabled="nextSlideDisable"
                />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import Swiper from 'swiper';

    const props = defineProps<{
        slides: {
            id: string;
            img: {
                src: string;
                alt?: string;
            };
            href?: string;
        }[];
    }>();

    const swiperNode = ref<HTMLDivElement | null>(null);

    let swiper: Swiper | null = null;

    const activeSwiperIndex = ref<number>(0);
    const prevSlideDisable = ref<boolean>(false);
    const nextSlideDisable = ref<boolean>(false);

    onMounted(() => {
        swiper = new Swiper(swiperNode.value!, {
            slidesPerView: 1,
            spaceBetween: 16,
            on: {
                slideChange: (swiper) => {
                    activeSwiperIndex.value = swiper.activeIndex;
                    checkButtons();
                },
            },
            breakpoints: {
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: -50,
                    centeredSlides: props.slides.length <= 1,
                },
            },
        });

        const checkButtons = () => {
            prevSlideDisable.value = swiper!.activeIndex === 0;
            nextSlideDisable.value = swiper!.isEnd;
        };

        checkButtons();
    });

    onUpdated(() => {
        swiper?.update();
    });

    onBeforeUnmount(() => {
        swiper?.destroy();
    });
</script>
