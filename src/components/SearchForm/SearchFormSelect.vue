<template>
    <div>
        <SearchFormInput
            @submit="submit"
            v-model="search"
        />
    </div>
</template>

<script setup lang="ts">
    const route = useRoute();

    const searchQuery = computed(() => {
        if (!route.query.search) {
            return null;
        }

        if (Array.isArray(route.query.search)) {
            return String(route.query.search[0]);
        }

        return String(route.query.search);
    });

    const search = ref<string>('');

    watch(
        () => route.name,
        () => {
            if (route.name === 'search') {
                search.value = searchQuery.value ?? '';
            }
        },
        {
            immediate: true,
        }
    );

    const router = useRouter();

    function submit() {
        if (!search.value) {
            return;
        }

        router.push({
            path: '/search',
            query: {
                search: search.value,
            },
        });
    }
</script>
