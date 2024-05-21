<template>
    <SearchFormInput
        v-model="search"
        @on-search-click="isSearchOpen = true"
        @focus="isSearchOpen = true"
    />

    <Teleport to="body">
        <SearchFormModal
            v-if="isSearchOpen"
            v-model="search"
            @close="isSearchOpen = false"
            :recently-searched="['чипсы', 'сахар', 'молоко', 'хлеб']"
            :suggestions="[
                'сахар',
                'молоко',
                'гречка',
                'яблоки',
                'крупа',
                'бананы',
                'помидоры',
                'яица',
            ]"
        />
    </Teleport>
</template>

<script setup lang="ts">
    const search = ref('');

    const isSearchOpen = ref<boolean>(false);

    const isMobile = ref<boolean>(false);

    onMounted(() => {
        const onWindowResize = function () {
            if (window.matchMedia('(min-width: 1024px)').matches) {
                isMobile.value = false;
                return;
            }

            isMobile.value = true;
        };

        onWindowResize();

        window.addEventListener('resize', onWindowResize);
    });
</script>
