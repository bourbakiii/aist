<template>
    <div>
        <div class="mb-4">
            <div
                class="h-[30px] w-[200px] max-w-full animate-pulse rounded-full bg-slate-200"
            ></div>
        </div>

        <div class="-m-4 flex gap-[12px] overflow-hidden p-4 md:-m-3 md:gap-4 md:p-3 lg:gap-5">
            <div
                v-for="n in 5"
                :key="n"
                class="w-[calc(50%_-_6px)] flex-none md:w-[calc(25%_-_12px)] lg:w-[calc(20%_-_16px)]"
            >
                <ProductCardSkeleton />
            </div>
        </div>

        <div class="mt-4 lg:hidden">
            <div class="flex justify-center gap-2">
                <div
                    v-for="n in 3"
                    :key="n"
                    class="h-2 w-2 animate-pulse rounded-full bg-slate-200"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
