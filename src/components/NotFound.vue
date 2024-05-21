<template>
    <div class="flex flex-col items-center text-center">
        <div class="w-full">
            <NuxtImg
                :preload="true"
                src="/images/not-found.svg"
                alt="Nothing found"
                class="mx-auto w-full max-w-[465px]"
            />
        </div>

        <div class="mt-6">
            <div class="mb-4 font-Inter text-[30px] font-bold lg:text-[40px]">
                <slot name="title">Здесь пока ничего нет</slot>
            </div>

            <div>
                <slot name="message" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
