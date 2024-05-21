<template>
    <header
        class="sticky left-0 top-0 z-30 flex min-h-[52px] w-full items-center bg-white py-2 shadow"
    >
        <div class="container">
            <SearchFormSelect v-if="isHomePage || isSearchPage" />

            <div
                v-else
                class="flex items-center gap-2"
            >
                <NuxtLink
                    v-if="linkBack"
                    :to="linkBack"
                    class="h-[24px] w-[24px] text-[24px]"
                >
                    <i class="icon-chevron-left block"></i>
                </NuxtLink>

                <h1 class="line-clamp-2 flex-1 font-Inter text-[24px] font-bold">
                    {{ title }}
                </h1>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import headerTitleKey from '~/keys/headerTitleKey';

    const title = inject(headerTitleKey);

    const route = useRoute();

    const isHomePage = computed(() => {
        return route.name === 'index';
    });

    const isSearchPage = computed(() => {
        return route.name === 'search';
    });

    const linkBack = computed<string | false>(() => {
        if (isHomePage.value) {
            return false;
        }

        const to = route.fullPath.split('/').slice(0, -1).join('/');

        if (!to) {
            return false;
        }

        return to;
    });
</script>
