<template>
    <div class="select-none">
        <label class="flex items-center">
            <div class="relative mr-2 flex-none">
                <input
                    v-model="value"
                    :value="props.value"
                    type="checkbox"
                    class="peer absolute left-0 top-0 z-10 block h-6 w-6 cursor-pointer opacity-0"
                />

                <div
                    class="relative h-6 w-6 rounded-[5px] border-2 border-aist-grey text-[0px] text-white transition-all duration-200 peer-checked:border-aist-green peer-checked:bg-aist-green peer-checked:text-[20px] peer-focus:ring peer-focus:ring-aist-green-light"
                >
                    <i
                        class="icon-check absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
                    ></i>
                </div>
            </div>

            <div>
                <slot />
            </div>
        </label>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: boolean | [];
        value?: any;
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: boolean | []];
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
