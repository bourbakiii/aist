<template>
    <div class="rounded-[10px] border-2 border-transparent bg-white shadow-aist xl:pb-[6px]">
        <div>
            <div class="aspect-[1/1] w-full animate-pulse rounded-[10px] bg-slate-200"></div>
        </div>

        <div class="px-2 pb-4 pt-3">
            <div>
                <div class="space-y-[8px] xl:h-[80px]">
                    <div class="h-[14px] animate-pulse rounded-full bg-slate-200"></div>

                    <div class="h-[14px] animate-pulse rounded-full bg-slate-200"></div>

                    <div class="h-[14px] animate-pulse rounded-full bg-slate-200 xl:hidden"></div>

                    <div class="h-[14px] w-1/2 animate-pulse rounded-full bg-slate-200"></div>
                </div>

                <div class="mt-2 flex h-[38px] gap-3 xl:mt-[22px] xl:h-auto">
                    <div class="flex flex-1 flex-col justify-end">
                        <div
                            class="h-[14px] animate-pulse rounded-full bg-slate-200 xl:h-[14px] xl:w-1/2"
                        ></div>
                    </div>

                    <div
                        class="h-9 w-9 flex-none animate-pulse rounded-[10px] bg-slate-200 xl:hidden"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
