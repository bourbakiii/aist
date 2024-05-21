<template>
    <div>
        <div
            v-if="props.label"
            class="mb-2 text-sm"
        >
            <button @click="inputNode!.focus()">
                {{ props.label }}

                <span
                    v-if="props.required"
                    class="text-aist-red"
                    >*</span
                >
            </button>
        </div>

        <div class="relative">
            <component
                :is="props.type === 'textarea' ? 'textarea' : 'input'"
                ref="inputNode"
                @input="
                    () => {
                        if (!mask) {
                            emit('update:modelValue', inputNode!.value);
                        }
                    }
                "
                :name="props.name"
                :type="props.type"
                :value="mask ? mask!.value : props.modelValue"
                :placeholder="props.placeholder"
                :disabled="props.isDisabled"
                :class="{
                    'min-h-[120px] py-3': props.type === 'textarea',
                    'h-11': props.type !== 'textarea',
                    'pl-[46px]': props.leadingIcon,
                    '!border-aist-red focus:!border-aist-green': props.error,
                }"
                class="w-full rounded-[10px] border border-aist-grey bg-white px-5 placeholder-aist-grey outline-none transition duration-75 focus:border-aist-green focus:ring focus:ring-aist-green focus:ring-opacity-50"
            />

            <i
                :class="[
                    props.leadingIcon,
                    ...(props.type === 'textarea' ? ['!top-[14px] !-translate-y-0'] : []),
                ]"
                class="absolute left-[16px] top-1/2 block -translate-y-1/2 text-[24px] text-aist-grey"
            ></i>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { InputMask, FactoryArg } from 'imask';
    import IMask from 'imask';
    import type IconClass from '~/core/constants/IconClass';

    const props = withDefaults(
        defineProps<{
            modelValue: string;
            label?: string;
            mask?: FactoryArg;
            name?: string;
            type?: string;
            placeholder?: string;
            isDisabled?: boolean;
            error?: boolean;
            leadingIcon?: IconClass;
            required?: boolean;
        }>(),
        {
            type: 'text',
            isDisabled: false,
            error: false,
            required: false,
        }
    );
    const emit = defineEmits<{
        'update:modelValue': [value: string];
    }>();

    const inputNode = ref<HTMLInputElement | null>(null);
    let mask: InputMask<FactoryArg> | null = null;

    onMounted(() => {
        if (props.mask) {
            // @ts-ignore
            mask = IMask(inputNode.value!, props.mask);

            mask.on('accept', () => {
                emit('update:modelValue', mask!.unmaskedValue);
            });
        }
    });

    watch(
        () => props.modelValue,
        (newValue) => {
            if (!mask) {
                return;
            }

            if (mask.unmaskedValue !== newValue) {
                mask.unmaskedValue = newValue;

                emit('update:modelValue', mask.unmaskedValue);
            }
        }
    );
</script>
