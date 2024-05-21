<template>
    <NuxtLoadingIndicator color="#55A630" />

    <TheHead />

    <NuxtLayout class="flex min-h-screen flex-col">
        <main
            v-if="props.error.statusCode === 404"
            class="flex items-center justify-center"
        >
            <div class="container my-12 lg:my-24">
                <NuxtImg
                    :preload="true"
                    src="/images/404.svg"
                    alt="Page not found"
                    class="mx-auto mb-16 block w-full max-w-[820px]"
                />

                <div class="text-center">
                    <h1 class="mb-4 font-Inter text-[30px] font-bold lg:text-[40px]">
                        Такой страницы нет
                    </h1>

                    <div>Но есть много других страниц</div>
                </div>

                <div class="mt-9 lg:flex lg:justify-center">
                    <div class="lg:w-[260px]">
                        <BaseButton
                            :is-big="true"
                            to="/"
                            text="Вернуться на главную"
                        />
                    </div>
                </div>
            </div>
        </main>

        <main v-else>
            <div class="container my-12 lg:my-24">
                <div class="rounded-md border border-red-900 bg-red-200 p-4 text-red-900">
                    <div class="mb-4">
                        {{ props.error.message }}
                    </div>

                    <div v-html="props.error.stack"></div>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const appConfig = useAppConfig();

    const props = defineProps(['error']);

    useSeoMeta({
        title:
            props.error.statusCode === 404
                ? `Страница не найдена · ${appConfig.title}`
                : `Произошла ошибка · ${appConfig.title}`,
    });
</script>
