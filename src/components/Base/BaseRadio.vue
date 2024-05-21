<template>
    <div
        :class="{
            'pointer-events-none opacity-40': props.disabled,
        }"
        class="flex select-none"
    >
        <label class="flex items-center">
            <div class="relative mr-2 flex-none">
                <input
                    v-model="value"
                    :value="props.value"
                    type="radio"
                    :disabled="props.disabled"
                    class="peer absolute left-0 top-0 z-10 block h-6 w-6 cursor-pointer opacity-0"
                />

                <div
                    class="relative h-6 w-6 rounded-full border-2 border-aist-grey transition-all duration-200 after:absolute after:left-1/2 after:top-1/2 after:block after:h-0 after:w-0 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-aist-green after:transition-all after:duration-200 peer-checked:border-aist-green peer-checked:after:h-[14px] peer-checked:after:w-[14px] peer-focus:ring peer-focus:ring-aist-green-light"
                ></div>
            </div>

            <div class="cursor-pointer">
                <slot />
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: any;
        value: any;
        disabled?: boolean;
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
</script>
