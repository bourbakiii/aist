<template>
    <ul class="space-y-4">
        <template v-for="m in items">
            <li
                v-if="m.description"
                class="flex justify-between"
            >
                <span class="w-[158px] flex-1 overflow-hidden text-ellipsis text-aist-grey">
                    {{ m.name }}
                </span>

                <span
                    :class="{ 'font-semibold': m.bold === true }"
                    class="ml-4 flex-1 overflow-hidden text-ellipsis"
                >
                    {{ m.description }}
                </span>
            </li></template
        >
    </ul>
</template>

<script setup lang="ts">
    const props = defineProps<{
        items: {
            name: string;
            description: string;
            bold?: boolean;
        }[];
    }>();
</script>
