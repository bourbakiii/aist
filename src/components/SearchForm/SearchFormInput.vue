<template>
    <form
        @submit.prevent="emit('submit', search)"
        ref="formSearchNode"
        class="group relative"
    >
        <button
            v-if="!props.removeLeadingIcon"
            @click="emit('onSearchClick')"
            type="button"
            aria-label="Поиск"
            class="absolute left-[16px] top-[8.5px] text-lg text-aist-grey group-focus:text-aist-green group-[.focus]:text-aist-green md:top-[11px] md:text-[24px]"
        >
            <i class="icon-search block"></i>
        </button>

        <input
            v-model="search"
            ref="searchInputNode"
            type="search"
            name="aist-product-search"
            placeholder="Поиск по товарам"
            autocomplete="off"
            :class="{
                '!pl-[10px]': props.removeLeadingIcon,
                '!bg-transparent': props.transparentBackground,
            }"
            class="h-[35px] w-full rounded-[10px] border border-transparent bg-aist-grey-light px-[42px] font-OpenSans outline-none placeholder:text-aist-grey focus:ring focus:ring-aist-green-light md:h-[46px] md:px-[48px]"
        />

        <button
            v-if="search"
            @click="
                search = '';
                searchInputNode!.focus();
            "
            aria-label="Очистить поиск"
            type="button"
            class="absolute right-[16px] top-[8.5px] text-lg text-aist-grey group-[.focus]:text-aist-black md:top-[11px] md:text-[24px]"
        >
            <i class="icon-cross block"></i>
        </button>
    </form>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            modelValue: string;
            removeLeadingIcon?: boolean;
            transparentBackground?: boolean;
            focusInputOnMounted?: boolean;
        }>(),
        {
            removeLeadingIcon: false,
            transparentBackground: false,
            focusInputOnMounted: false,
        }
    );

    const emit = defineEmits<{
        'update:modelValue': [value: string];
        submit: [search: string];
        focus: [];
        onSearchClick: [];
    }>();

    const search = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const formSearchNode = ref<HTMLFormElement | null>(null);

    const searchInputNode = ref<HTMLInputElement | null>(null);

    onMounted(() => {
        if (props.focusInputOnMounted) {
            searchInputNode.value!.focus();
        }

        searchInputNode.value!.addEventListener('focus', onInputFocus);

        searchInputNode.value!.addEventListener('blur', onInputBlur);
    });

    function onInputFocus() {
        formSearchNode.value!.classList.add('focus');

        emit('focus');
    }

    function onInputBlur() {
        formSearchNode.value!.classList.remove('focus');
    }

    onBeforeUnmount(() => {
        searchInputNode.value!.removeEventListener('focus', onInputFocus);

        searchInputNode.value!.removeEventListener('blur', onInputBlur);
    });
</script>
