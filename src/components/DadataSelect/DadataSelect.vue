<template>
    <Combobox v-model="selectedOption">
        <div class="relative">
            <div class="relative">
                <ComboboxInput
                    @change="query = $event.target.value"
                    :placeholder="props.placeholder"
                    :displayValue="(option: any) => option?.fullAddress"
                    autocomplete="off"
                    :class="{
                        '!border-aist-red focus:!border-aist-green': props.error,
                    }"
                    class="h-11 w-full rounded-[10px] border border-aist-grey bg-white pl-[46px] pr-5 placeholder-aist-grey outline-none transition duration-75 focus:border-aist-green focus:ring focus:ring-aist-green focus:ring-opacity-50"
                />

                <i
                    :class="[iconClass]"
                    class="absolute left-[16px] top-1/2 block -translate-y-1/2 text-[20px] text-aist-grey"
                ></i>

                <ComboboxButton
                    class="absolute left-0 top-0 h-full w-full rounded-[10px] opacity-0"
                />
            </div>

            <ComboboxOptions as="template">
                <div
                    class="absolute left-0 z-20 mt-2 max-h-60 w-full origin-top overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    <div
                        v-if="
                            (query && filteredOptions !== null && !filteredOptions.length) ||
                            (filteredOptions !== null && !filteredOptions.length && dadataIsPending)
                        "
                        class="px-4 py-2"
                    >
                        Ничего <b>не найдено</b>
                    </div>

                    <div
                        v-else-if="
                            (!query && !filteredOptions?.length) ||
                            (filteredOptions === null && dadataIsPending)
                        "
                        class="px-4 py-2"
                    >
                        Начните вводить <b>адрес</b>
                    </div>

                    <ul v-else-if="filteredOptions?.length">
                        <ComboboxOption
                            v-for="option in filteredOptions"
                            :key="option.fullAddress"
                            v-slot="{ active, selected }"
                            :value="option"
                            as="template"
                        >
                            <li
                                :class="[
                                    active ? 'bg-aist-green/10 text-aist-green' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                            >
                                <span
                                    :class="[selected ? 'font-medium' : 'font-normal']"
                                    class="block"
                                >
                                    {{ option.fullAddress }}
                                </span>

                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-aist-green"
                                >
                                    <CheckIcon
                                        class="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </li>
                        </ComboboxOption>
                    </ul>
                </div>
            </ComboboxOptions>
        </div>
    </Combobox>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';
    import {
        Combobox,
        ComboboxInput,
        ComboboxOptions,
        ComboboxOption,
        ComboboxButton,
    } from '@headlessui/vue';
    import { CheckIcon } from '@heroicons/vue/20/solid';
    import { FetchError } from 'ofetch';
    import debounce from 'lodash/debounce';

    interface Address {
        fullAddress: string;
        street: string;
        house: string;
    }

    const props = defineProps<{
        modelValue: Address | null;
        placeholder?: string;
        error?: boolean;
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: Address | null];
    }>();

    const selectedOption = computed({
        get() {
            return props.modelValue;
        },
        set(newValue) {
            emit('update:modelValue', newValue);
        },
    });

    const iconClass: IconClass = 'icon-location-point';

    const queryValue = ref('');

    const query = computed({
        get() {
            return queryValue.value;
        },
        set: debounce((newValue) => {
            queryValue.value = newValue;
        }, 500),
    });

    const filteredOptions = ref<Address[] | null>(null);

    const config = useRuntimeConfig();

    const dadataIsPending = ref<boolean>(false);

    watch(query, async () => {
        if (!query.value) {
            filteredOptions.value = null;

            return;
        }

        dadataIsPending.value = true;

        try {
            const response: any = await $fetch(
                'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                {
                    method: 'POST',
                    body: {
                        query: query.value,
                    },
                    headers: {
                        Authorization: `Token ${config.public.dadataToken}`,
                    },
                }
            );

            filteredOptions.value = (response.suggestions as any[]).map((s) => ({
                fullAddress: s.value,
                street: s.data.street,
                house: s.data.house,
            }));
        } catch (e) {
            if (e instanceof FetchError) {
            }
        }

        dadataIsPending.value = false;
    });
</script>
