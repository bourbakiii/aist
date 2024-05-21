<template>
    <div
        ref="wrapperNode"
        class="relative"
    >
        <div
            ref="swiperNode"
            class="swiper group/swiper -m-4 p-4 md:-m-3 md:p-3"
        >
            <div class="swiper-wrapper">
                <slot />
            </div>

            <div
                v-if="slidesCount > 1"
                class="mt-4 lg:hidden"
            >
                <SwiperPagination
                    :slides="slidesCount"
                    :active-slide="activeSlide"
                />
            </div>
        </div>

        <template v-if="slidesCount > 1">
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

    const wrapperNode = ref<HTMLDivElement | null>(null);

    const prevSlideDisable = ref<boolean>(false);
    const nextSlideDisable = ref<boolean>(false);

    const swiperNode = ref<HTMLDivElement | null>(null);
    const activeSlide = ref<number>(0);
    const slidesCount = ref<number>(0);

    let swiper: Swiper | null = null;

    onMounted(() => {
        swiper = new Swiper(swiperNode.value!, {
            slidesPerView: 2,
            spaceBetween: 12,
            on: {
                init: function (swiper) {
                    sliderSync(swiper);
                },
                slideChange: sliderSync,
                resize: sliderSync,
                update: sliderSync,
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
        });
    });

    function sliderSync(swiper: Swiper) {
        activeSlide.value = swiper.activeIndex;

        (() => {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                slidesCount.value = Math.max(swiper.slides.length - 4, 1);

                return;
            }

            slidesCount.value = Math.max(swiper.slides.length - 1, 1);
        })();

        (() => {
            prevSlideDisable.value = swiper.isBeginning;
            nextSlideDisable.value = swiper.isEnd;
        })();
    }

    onUpdated(() => {
        swiper?.update();
    });

    onBeforeUnmount(() => {
        swiper?.destroy();
    });
</script>
