<template>
    <div class="fixed left-0 top-0 z-[35] h-full w-full bg-white pb-[57px]">
        <div class="h-full overflow-y-auto">
            <header class="sticky left-0 top-0 w-full bg-white py-2 shadow">
                <div class="container">
                    <div class="flex items-center gap-2">
                        <button
                            @click="emit('close')"
                            class="h-[24px] w-[24px] text-[24px]"
                        >
                            <i class="icon-chevron-left block"></i>
                        </button>

                        <div class="flex-1">
                            <SearchFormInput
                                v-model="search"
                                :remove-leading-icon="true"
                                :transparent-background="true"
                                :focus-input-on-mounted="true"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div class="container">
                <div class="mb-5 mt-[36px] space-y-9">
                    <div v-if="props.recentlySearched?.length">
                        <TheTitleSmaller class="mb-6">Недавно искали</TheTitleSmaller>

                        <ul class="space-y-5">
                            <li
                                v-for="suggestion in props.recentlySearched"
                                :key="suggestion"
                                class="flex items-center"
                            >
                                <i
                                    class="icon-history mr-2 flex-none text-[20px] text-aist-grey"
                                ></i>

                                <span class="flex-1">
                                    {{ suggestion }}
                                </span>

                                <i class="icon-cross ml-2 flex-none text-[20px] text-aist-grey"></i>
                            </li>
                        </ul>
                    </div>

                    <div v-if="props.suggestions?.length">
                        <TheTitleSmaller class="mb-6">Популярные запросы</TheTitleSmaller>

                        <ul class="space-y-5">
                            <li
                                v-for="suggestion in props.suggestions"
                                :key="suggestion"
                                class="flex items-center"
                            >
                                <i
                                    class="icon-search mr-2 flex-none text-[20px] text-aist-grey"
                                ></i>

                                <span class="flex-1">
                                    {{ suggestion }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: any;
        recentlySearched?: string[];
        suggestions?: string[];
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: string];
        onSuggestionClick: [suggestion: string];
        close: [];
    }>();

    const search = computed({
        get() {
            return props.modelValue;
        },
        set(newValue: string) {
            emit('update:modelValue', newValue);
        },
    });

    onMounted(() => {
        document.body.classList.add('overflow-hidden');
    });

    onBeforeUnmount(() => {
        document.body.classList.remove('overflow-hidden');
    });
</script>
