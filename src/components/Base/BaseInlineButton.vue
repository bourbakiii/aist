<template>
    <button
        @click="emit('click')"
        class="flex items-center rounded-[10px] p-2 hover:bg-aist-grey-light focus:bg-aist-grey-light"
        type="button"
    >
        <i
            :class="[props.leadingIcon]"
            class="mr-1 block text-[20px]"
        ></i>

        <span class="text-sm font-semibold">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
    import type IconClass from '~/core/constants/IconClass';

    const props = defineProps<{
        leadingIcon?: IconClass;
    }>();

    const emit = defineEmits<{
        click: [];
    }>();
</script>
