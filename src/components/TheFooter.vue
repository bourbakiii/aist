<template>
    <footer
        class="sticky bottom-0 left-0 z-20 w-full bg-white py-2 lg:relative lg:block lg:bg-aist-green lg:pb-16 lg:pt-12 lg:text-white"
    >
        <div class="container">
            <div class="mb-4 flex items-start justify-between">
                <NuxtLink
                    href="/"
                    class="block"
                >
                    <NuxtImg
                        src="images/logo-white.svg"
                        alt="Аист"
                        class="w-[220px]"
                    />
                </NuxtLink>

                <div class="flex gap-16">
                    <div>
                        <div class="mb-3 font-semibold">Мы в социальных сетях:</div>

                        <div class="flex gap-3 text-[30px]">
                            <div>
                                <a
                                    href="#"
                                    class="block"
                                >
                                    <i class="icon-telegram block"></i>
                                </a>
                            </div>

                            <div>
                                <a
                                    href="#"
                                    class="block"
                                >
                                    <i class="icon-vkontakte block"></i>
                                </a>
                            </div>

                            <div>
                                <a
                                    href="#"
                                    class="block"
                                >
                                    <i class="icon-odnoklasniki block"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="mb-3 font-semibold">Контакты:</div>

                        <div class="space-y-2">
                            <a
                                href="#"
                                class="flex items-center font-semibold"
                            >
                                <i class="icon-phone mr-2 text-[20px]"></i>

                                <span>+7 (800) 333-44-55</span>
                            </a>

                            <a
                                href="#"
                                class="flex items-center font-semibold"
                            >
                                <i class="icon-mail mr-2 text-[20px]"></i>

                                <span>support@aist.ru</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-end justify-between">
                <div class="max-w-[460px]">
                    {{ new Date().getFullYear() }} Акционерное Общество «Аист»,ОГРН: 1144486191423,
                    ИНН/КПП: 8843267356 / 884309009. Любое использование материалов сайта без
                    разрешения запрещено.
                </div>

                <div class="flex gap-9">
                    <a
                        href="#"
                        class="hover:underline"
                    >
                        Правовая информация
                    </a>

                    <a
                        href="#"
                        class="hover:underline"
                    >
                        Пользовательское соглашение
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';

    const navItems: { icon: IconClass; label: string }[] = [
        {
            icon: 'icon-home',
            label: 'Главная',
        },
        {
            icon: 'icon-catalog',
            label: 'Каталог',
        },
        {
            icon: 'icon-cart',
            label: 'Корзина',
        },
        {
            icon: 'icon-heart',
            label: 'Избранное',
        },
        {
            icon: 'icon-user',
            label: 'Профиль',
        },
    ];
</script>
