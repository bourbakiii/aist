<template>
    <div>
        <TheHeaderMobile
            v-if="isMobile === undefined || isMobile === true"
            class="lg:hidden"
        />

        <TheHeader
            v-if="isMobile === undefined || isMobile === false"
            class="hidden lg:block"
        />

        <main class="my-9 lg:my-16">
            <slot />
        </main>

        <TheFooterMobile
            v-if="isMobile === undefined || isMobile === true"
            class="lg:hidden"
        />

        <TheFooter
            v-if="isMobile === undefined || isMobile === false"
            class="hidden lg:block"
        />
    </div>
</template>

<script setup lang="ts">
    const { isMobile } = useMobile();
</script>
