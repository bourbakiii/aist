<template>
    <div class="flex items-center gap-1">
        <a
            @click.prevent="onClick"
            :href="props.to"
            class="block w-full overflow-hidden text-ellipsis rounded-[10px] px-4 py-3 text-base font-semibold transition duration-200 hover:bg-aist-grey-light focus:bg-aist-grey-light"
        >
            <slot />
        </a>

        <button
            v-if="props.hideArrow"
            @click="emit('arrowClick')"
            class="h-[48px] w-[48px] flex-none rounded-[10px] text-[20px] hover:bg-aist-grey-light focus:bg-aist-grey-light"
        >
            <i class="icon-chevron-right block"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            to: string;
            hideArrow?: boolean;
        }>(),
        {
            hideArrow: false,
        }
    );

    const emit = defineEmits<{
        close: [];
        arrowClick: [];
    }>();

    const router = useRouter();

    async function onClick() {
        const result = await router.push(props.to);

        if (!result) {
            emit('close');
        }
    }
</script>
