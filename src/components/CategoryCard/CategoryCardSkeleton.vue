<template>
    <div class="rounded-[10px] border border-aist-grey-light bg-white p-6 lg:p-12">
        <div
            class="mb-4 h-[28px] w-1/2 animate-pulse rounded-full bg-slate-200 lg:mb-6 lg:h-[36px]"
        ></div>

        <div class="space-y-3 md:min-h-[148px] lg:min-h-[184px] lg:space-y-4">
            <div
                v-for="n in 5"
                class="h-[20px] animate-pulse rounded-full bg-slate-200 lg:h-[22px]"
            ></div>
        </div>

        <div class="mt-4 h-[24px] w-[100px] animate-pulse rounded-full bg-slate-200 lg:mt-6"></div>

        <div
            class="mt-6 h-[46px] animate-pulse rounded-[10px] bg-slate-200 lg:mt-9 lg:max-w-[150px]"
        ></div>
    </div>
</template>

<script setup lang="ts"></script>
