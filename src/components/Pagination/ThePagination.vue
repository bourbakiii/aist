<template>
    <div
        class="flex justify-center lg:justify-start [&>*:first-child]:ml-0 [&>*:first-child]:rounded-l-md [&>*:first-child]:border-l [&>*:last-child]:rounded-r-md [&>*:last-child]:border-r [&>*]:-ml-[1px]"
    >
        <PaginationBaseButton
            v-if="props.modelValue !== 1"
            @click.prevent="page = page - 1"
            :icon-class="'icon-chevron-left'"
            :href="`?page=${page - 1}`"
        />

        <PaginationBaseButton
            v-for="n in showingPages"
            @click.prevent="page = n"
            :key="n"
            :active="n === props.modelValue"
            :text="n.toString()"
            :href="`?page=${n}`"
        />

        <PaginationBaseButton
            v-if="props.modelValue !== props.lastPage"
            @click.prevent="page = page + 1"
            :icon-class="'icon-chevron-right'"
            :href="`?page=${page + 1}`"
        />
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: number;
        lastPage: number;
        isLoading?: boolean;
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: number];
    }>();

    const page = computed({
        get() {
            return props.modelValue;
        },
        set(newValue) {
            if (props.isLoading === true) {
                return;
            }

            emit('update:modelValue', newValue);
        },
    });

    const showingPages = computed<number[]>(() => {
        if (props.lastPage === 1) {
            return [1];
        }

        if (props.lastPage === 2) {
            return [1, 2];
        }

        if (props.modelValue === 1) {
            return [1, 2, 3];
        }

        if (props.modelValue === props.lastPage) {
            return [props.lastPage - 2, props.lastPage - 1, props.lastPage];
        }

        return [props.modelValue - 1, props.modelValue, props.modelValue + 1];
    });
</script>
