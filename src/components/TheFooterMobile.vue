<template>
    <footer
        class="sticky bottom-0 left-0 z-40 w-full bg-white py-2 lg:relative lg:block lg:bg-aist-green lg:pb-16 lg:pt-12 lg:text-white"
    >
        <div class="container">
            <div class="flex justify-between gap-[6px]">
                <div
                    v-for="navItem in navItems"
                    :key="navItem.label"
                    class="flex-1"
                >
                    <NuxtLink
                        :to="navItem.link"
                        class="flex flex-col items-center font-OpenSans text-[10px] text-aist-grey [&.router-link-active]:text-aist-green"
                    >
                        <i
                            :class="[navItem.icon]"
                            class="mb-[2px] block text-[24px]"
                        ></i>

                        <div class="text-center">{{ navItem.label }}</div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const navItems: { icon: string; label: string; link: string }[] = [
        {
            icon: 'icon-home',
            label: 'Главная',
            link: '/',
        },
        {
            icon: 'icon-catalog',
            label: 'Каталог',
            link: '/catalog',
        },
        {
            icon: 'icon-cart',
            label: 'Корзина',
            link: '/cart',
        },
        {
            icon: 'icon-heart',
            label: 'Избранное',
            link: '/favorite',
        },
        {
            icon: 'icon-user',
            label: 'Профиль',
            link: '/profile',
        },
    ];
</script>
