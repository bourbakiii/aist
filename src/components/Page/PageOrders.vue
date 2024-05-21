<template>
    <div class="container">
        <div class="hidden lg:block">
            <div class="mb-9 flex items-center justify-between gap-4">
                <TheTitleSmall :tag="'h1'">Профиль</TheTitleSmall>

                <div>
                    <BaseButton
                        @click="logout"
                        :is-loading="logoutIsPending"
                        :text="'Выйти'"
                        :is-big="true"
                        :is-red-outlined="true"
                        aria-label="Выйти из аккаунта"
                    />
                </div>
            </div>
        </div>

        <div>
            <TheTitleSmaller class="mb-5 lg:mb-9">История заказов</TheTitleSmaller>

            <template v-if="getOrdersState === 'pending' || getOrdersState === 'idle'">
                <div class="space-y-[30px] 2xl:w-[75%]">
                    <div
                        v-for="n in perPage"
                        :key="n"
                    >
                        <HistoryOrderCardSkeleton />
                    </div>
                </div>
            </template>

            <div
                v-else
                class="mb-[24px] 2xl:w-[75%]"
            >
                <div
                    v-if="currentOrder?.length"
                    class="space-y-6"
                >
                    <template v-for="order in currentOrder">
                        <HistoryOrderCard :order="order" />
                    </template>
                </div>

                <PlaceholderText v-else> Пока <b>нет</b> никаких <b>заказов</b> </PlaceholderText>
            </div>

            <div
                v-if="lastPage && page <= lastPage && lastPage > 1"
                class="mt-6"
            >
                <ThePagination
                    v-model="page"
                    :last-page="lastPage"
                    :is-loading="getOrdersState === 'pending'"
                />
            </div>

            <div class="mt-9 lg:hidden">
                <BaseButton
                    @click="logout"
                    :is-loading="logoutIsPending"
                    :text="'Выйти'"
                    :is-big="true"
                    :is-red-outlined="true"
                    aria-label="Выйти из аккаунта"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import AistApi from '~/api/AistApi/AistApi';

    const route = useRoute();
    const router = useRouter();

    const page = computed({
        get() {
            return Number(route.query.page ?? 1);
        },

        set(value) {
            if (getOrdersState.value === 'pending') {
                return;
            }

            router.push({ query: { ...route.query, page: value } });
        },
    });

    const perPage = 6;

    const { data: ordersData, status: getOrdersState } = await useAsyncData(
        'get-orders',
        () => AistApi.getOrder(perPage, page.value),
        {
            watch: [page],
            server: false,
            lazy: true,
        }
    );

    const currentOrder = computed(() => {
        return ordersData.value?.[0];
    });

    const lastPage = computed(() => {
        return ordersData.value?.[1];
    });

    const { isPending: logoutIsPending, logout } = useLogout();
</script>
