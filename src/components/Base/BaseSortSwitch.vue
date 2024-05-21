<template>
    <button
        @click="onClick"
        :class="{
            'opacity-50': !isActive,
        }"
        class="relative flex items-center pr-[24px]"
    >
        <span class="font-semibold">
            <slot />
        </span>

        <Transition
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 -translate-x-[10px]"
            leave-active-class="transition duration-200"
            leave-to-class="opacity-0"
        >
            <span
                v-show="isActive"
                :class="{ 'rotate-180': isSecondType }"
                class="absolute right-0 top-1/2 flex-none -translate-y-1/2 transition duration-150 ease-in-out"
            >
                <i class="icon-arrow-down block text-[24px]"></i>
            </span>
        </Transition>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: any;
        firstValue: any;
        secondValue: any;
        compareFunction?: (currentValue: any, value: any) => boolean;
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: any];
    }>();

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(newValue) {
            emit('update:modelValue', newValue);
        },
    });

    const isFirstType = computed(() => {
        if (props.compareFunction) {
            return props.compareFunction(toRaw(value.value), props.firstValue);
        }

        return value.value === props.firstValue;
    });

    const isSecondType = computed(() => {
        if (props.compareFunction) {
            return props.compareFunction(toRaw(value.value), props.secondValue);
        }

        return value.value === props.secondValue;
    });

    const isActive = computed(() => {
        return isFirstType.value || isSecondType.value;
    });

    function onClick() {
        if (isFirstType.value) {
            value.value = props.secondValue;

            return;
        }

        value.value = props.firstValue;
    }
</script>
