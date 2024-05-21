<template>
    <div>
        <div>
            <div class="lg:flex">
                <div class="relative lg:w-[588px]">
                    <div
                        ref="swiperNode"
                        class="swiper w-full rounded-[10px] bg-white shadow-aist"
                    >
                        <div class="swiper-wrapper">
                            <div
                                v-for="slide in props.slides"
                                :key="slide.id"
                                class="swiper-slide group"
                            >
                                <NuxtPicture
                                    :src="slide.img.src"
                                    :alt="slide.img.alt"
                                    :img-attrs="{
                                        class: 'aspect-[21/9] h-[328px] w-full rounded-[10px] object-contain lg:h-[588px] lg:scale-[0.8] lg:transition lg:duration-300',
                                    }"
                                    :sizes="'300px sm:500px md:700px'"
                                    placeholder
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <div
                            ref="swiperThumbNode"
                            class="swiper -m-2 p-2"
                        >
                            <div class="swiper-wrapper">
                                <div
                                    v-for="slide in props.slides"
                                    :key="slide.id"
                                    class="swiper-slide flex w-[54px] justify-center rounded-[10px] border-2 border-transparent bg-white shadow-aist sm:w-[104px] lg:transition lg:duration-300 [&.swiper-slide-thumb-active]:border-aist-green"
                                >
                                    <NuxtPicture
                                        :src="slide.img.src"
                                        :alt="slide.img.alt"
                                        :img-attrs="{
                                            class: 'h-[50px] w-[50px] rounded-[10px] object-contain sm:h-[100px] sm:w-[100px]',
                                        }"
                                        :sizes="'50px sm:100px'"
                                        placeholder
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="props.slides.length > 1">
                        <div
                            class="absolute left-[8px] top-[41%] z-10 -translate-y-1/2 md:left-[24px]"
                        >
                            <SwiperButton
                                @click="mainSwiper?.slidePrev()"
                                :direction="'left'"
                                :disabled="prevSlideDisable"
                            />
                        </div>

                        <div
                            class="absolute right-[8px] top-[41%] z-10 -translate-y-1/2 md:right-[24px]"
                        >
                            <SwiperButton
                                @click="mainSwiper?.slideNext()"
                                :direction="'right'"
                                :disabled="nextSlideDisable"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Swiper from 'swiper';
    import { Thumbs } from 'swiper/modules';

    const props = defineProps<{
        slides: {
            id: string;
            img: {
                src: string;
                alt?: string;
            };
        }[];
    }>();

    const swiperNode = ref<HTMLDivElement | null>(null);

    const swiperThumbNode = ref<HTMLDivElement | null>(null);

    let mainSwiper: Swiper | null = null;

    let thumbsSlider: Swiper | null = null;

    const activeThumbSwiperIndex = ref<number>(0);

    const activeSwiperIndex = ref<number>(0);
    const prevSlideDisable = ref<boolean>(false);
    const nextSlideDisable = ref<boolean>(false);

    onMounted(() => {
        thumbsSlider = new Swiper(swiperThumbNode.value!, {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 12,
            on: {
                slideChange: (swiper) => {
                    activeThumbSwiperIndex.value = swiper.activeIndex;

                    checkButtons();
                },
            },
            breakpoints: {
                1024: {
                    spaceBetween: 16,
                },
            },
        });

        mainSwiper = new Swiper(swiperNode.value!, {
            modules: [Thumbs],
            slidesPerView: 1,
            spaceBetween: 16,
            on: {
                slideChange: (swiper) => {
                    activeSwiperIndex.value = swiper.activeIndex;

                    checkButtons();
                },
            },
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: -50,
                    centeredSlides: props.slides.length <= 1,
                },
            },
            thumbs: {
                swiper: thumbsSlider,
            },
        });

        const checkButtons = () => {
            prevSlideDisable.value = mainSwiper!.activeIndex === 0;
            nextSlideDisable.value = mainSwiper!.isEnd;
        };

        checkButtons();
    });

    onUpdated(() => {
        mainSwiper?.update();
        thumbsSlider?.update();
    });

    onBeforeUnmount(() => {
        mainSwiper?.destroy();
        thumbsSlider?.destroy();
    });
</script>
