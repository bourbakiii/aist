<template>
    <div
        class="relative flex items-center rounded-[10px] bg-aist-green px-6 text-white xl:mx-auto xl:max-w-[1196px]"
    >
        <NuxtImg
            :preload="true"
            src="/images/logo-mini-white.svg"
            alt="Аист"
            class="mr-[14px] block h-[48px] w-[48px] sm:h-[96px] sm:w-[96px] lg:mr-[24px] lg:h-[138px] lg:w-[138px] xl:mr-[96px]"
        />

        <div
            v-if="props.text"
            class="py-4 text-sm font-semibold sm:text-base lg:max-w-[350px] lg:font-Inter lg:text-3xl xl:max-w-[320px]"
        >
            {{ props.text }}
        </div>

        <div
            class="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden rounded-[10px] lg:after:absolute lg:after:-right-[140px] lg:after:-top-[80px] lg:after:h-[568px] lg:after:w-[568px] lg:after:rounded-full lg:after:bg-white/70 xl:after:-right-[90px]"
        ></div>

        <NuxtImg
            :preload="true"
            src="/images/banner-loyalty-card-decor.svg"
            alt="Покупайте выгоднее с картой лояльности"
            class="absolute bottom-0 right-0 hidden lg:block xl:right-[50px]"
        />

        <div
            class="hidden lg:absolute lg:right-[110px] lg:top-1/2 lg:block lg:-translate-y-1/2 xl:right-[150px]"
        >
            <BaseButton
                :text="'Оформить'"
                :is-black="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        text?: string;
    }>();
</script>
