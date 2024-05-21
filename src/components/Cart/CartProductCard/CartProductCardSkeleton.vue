<template>
    <div
        class="relative rounded-[10px] bg-white p-4 shadow-aist md:flex md:items-center md:justify-between md:px-6 lg:px-12 lg:py-9"
    >
        <div class="flex gap-3">
            <div class="h-[100px] w-[100px] flex-none animate-pulse rounded-md bg-slate-200"></div>

            <div
                class="flex flex-1 flex-col justify-between md:w-[180px] md:flex-none lg:w-[320px]"
            >
                <div class="space-y-[8px]">
                    <div class="h-[14px] animate-pulse rounded-full bg-slate-200"></div>

                    <div class="h-[14px] w-1/2 animate-pulse rounded-full bg-slate-200"></div>
                </div>

                <div>
                    <div
                        class="h-[14px] w-1/2 animate-pulse rounded-full bg-slate-200 md:hidden"
                    ></div>

                    <div
                        class="hidden md:block md:h-[36px] md:w-[36px] md:animate-pulse md:rounded-full md:bg-slate-200"
                    ></div>
                </div>
            </div>
        </div>

        <div class="mt-3 flex justify-between md:hidden">
            <div class="flex gap-2 sm:gap-4">
                <div class="h-[36px] w-[120px] animate-pulse rounded-[10px] bg-slate-200"></div>

                <div class="h-[36px] w-[36px] animate-pulse rounded-full bg-slate-200"></div>
            </div>

            <div class="w-[70px] flex-none">
                <div class="h-[14px] w-1/2 animate-pulse rounded-full bg-slate-200 md:hidden"></div>

                <div
                    class="mt-[12px] h-[14px] animate-pulse rounded-full bg-slate-200 md:hidden"
                ></div>
            </div>
        </div>

        <div class="hidden md:block md:w-[80px]">
            <div class="h-[14px] animate-pulse rounded-full bg-slate-200"></div>
        </div>

        <div class="hidden md:block">
            <div class="h-[36px] w-[130px] animate-pulse rounded-[10px] bg-slate-200"></div>
        </div>

        <div class="hidden w-[150px] md:flex md:justify-end">
            <div class="h-[14px] w-[100px] animate-pulse rounded-full bg-slate-200"></div>
        </div>
    </div>
</template>
