<template>
    <div class="rounded-[10px] bg-white px-6 py-9 shadow-aist">
        <div class="space-y-4">
            <div
                v-for="n in 4"
                :key="n"
                class="flex justify-between"
            >
                <div class="h-[14px] w-[60%] animate-pulse rounded-full bg-slate-200"></div>

                <div class="h-[14px] w-[20%] animate-pulse rounded-full bg-slate-200"></div>
            </div>

            <div class="h-[44px] animate-pulse rounded-[10px] bg-slate-200"></div>
        </div>
    </div>
</template>
