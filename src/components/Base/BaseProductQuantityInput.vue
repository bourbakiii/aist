<template>
    <div class="group/input relative w-full">
        <div class="absolute left-0 top-0">
            <BaseButtonIcon
                @click="value = value - 1"
                :disabled="canRemoveMore === false"
                :icon-class="'icon-minus'"
                :is-big="props.isBig"
                aria-label="Уменьшить"
            />
        </div>

        <input
            ref="inputNode"
            :value="`${quantity} ${props.measure}`"
            type="text"
            readonly
            :class="{ '!h-[46px] !text-base': props.isBig }"
            class="h-9 w-full truncate rounded-[10px] border border-aist-grey-light px-10 text-center text-xs font-semibold outline-none focus:ring focus:ring-aist-green-light group-[&:has(*:focus)]/input:ring group-[&:has(*:focus)]/input:ring-aist-green-light"
        />

        <div class="absolute right-0 top-0">
            <BaseButtonIcon
                @click="value = value + 1"
                :disabled="canAddMore === false"
                :icon-class="'icon-plus'"
                :is-big="props.isBig"
                aria-label="Увеличить"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            modelValue: number;
            isBig?: boolean;
            measure?: string;
            addingStep?: number;
            stock?: number;
            minCount?: number;
            setFocusOnMounted?: boolean;
            isAvailable?: boolean;
        }>(),
        {
            isBig: false,
            measure: 'шт',
            addingStep: 1,
            setFocusOnMounted: false,
            isAvailable: false,
        }
    );

    const emit = defineEmits<{
        'update:modelValue': [value: number];
    }>();

    const inputNode = ref<HTMLInputElement | null>(null);

    function setFocus() {
        inputNode.value!.focus();
    }

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(newValue: number) {
            emit('update:modelValue', newValue >= 0 ? newValue : 0);
        },
    });

    onMounted(() => {
        if (props.setFocusOnMounted === true) {
            setFocus();
        }
    });

    const quantity = computed(() => {
        const quantity = value.value * props.addingStep;

        if (Number.isInteger(quantity)) {
            return quantity;
        }

        return quantity.toFixed(2);
    });

    const canRemoveMore = computed(() => {
        if (props.minCount === undefined) {
            return true;
        }

        const newCount = (value.value - 1) * props.addingStep;

        return newCount >= props.minCount;
    });

    const canAddMore = computed(() => {
        if (!props.stock) {
            return true;
        }

        const newCount = (value.value + 1) * props.addingStep;

        return newCount <= props.stock;
    });
</script>
