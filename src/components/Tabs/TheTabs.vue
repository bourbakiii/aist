<template>
    <div>
        <TabGroup
            @change="
                (index) => {
                    emit('update:modelValue', props.tabs[index].id);
                }
            "
        >
            <TabList
                class="relative -mx-2 -mt-2 flex overflow-hidden rounded-t-[10px] px-2 pt-2 after:absolute after:bottom-0 after:left-0 after:block after:h-[1px] after:w-full after:bg-white lg:items-start"
            >
                <Tab
                    v-for="tabs in props.tabs"
                    as="template"
                    :key="tabs.id"
                    v-slot="{ selected }"
                >
                    <button
                        :class="[
                            'relative z-10 w-full rounded-t-[10px] py-3 font-semibold ring-inset ring-aist-green ring-white/60 hover:text-aist-green focus:text-aist-green focus:outline-none focus:ring-2 md:w-auto md:px-6',
                            selected ? 'bg-white shadow-aist' : 'hover:bg-white/[0.12]',
                        ]"
                    >
                        {{ tabs.name }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="rounded-b-[10px] bg-white px-6 pb-10 pt-9 shadow-aist">
                <slot />
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script setup lang="ts">
    import { TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue';

    const props = defineProps<{
        modelValue: string;
        tabs: {
            id: string;
            name: string;
        }[];
    }>();

    const emit = defineEmits<{
        'update:modelValue': [value: string];
    }>();
</script>
