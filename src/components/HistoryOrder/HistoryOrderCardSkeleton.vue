<template>
    <div
        class="rounded-[10px] bg-white px-[16px] py-[24px] shadow-aist lg:px-[38px] lg:py-[48px] xl:px-[36px]"
    >
        <div class="flex items-center justify-between">
            <div class="flex gap-2">
                <div
                    v-for="n in 5"
                    class="h-[40px] w-[40px] animate-pulse rounded-[5px] bg-slate-200 lg:h-[100px] lg:w-[100px]"
                ></div>
            </div>

            <div
                class="ml-3 hidden h-[15px] w-[70px] animate-pulse rounded-[5px] bg-slate-200 lg:block lg:h-[46px] lg:w-[160px]"
            ></div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
