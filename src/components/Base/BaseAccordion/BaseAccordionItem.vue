<template>
    <div class="accordion-item">
        <button
            class="accordion-trigger w-full rounded-[10px] bg-aist-grey-light px-6 py-3 transition duration-100 [&.active]:bg-aist-green [&.active]:text-white hover:[&:not(.active)]:text-aist-green"
        >
            <slot name="header" />
        </button>

        <div class="accordion-dropdown">
            <div class="pb-5 pt-9">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
    .accordion-dropdown {
        opacity: 0;
        height: 0;
        overflow: hidden;
    }
</style>
