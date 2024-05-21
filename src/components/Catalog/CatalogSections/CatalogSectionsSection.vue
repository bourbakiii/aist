<template>
    <div>
        <NuxtLink
            :to="props.section.to"
            :class="{
                'bg-aist-green/20': props.section.current,
            }"
            class="flex items-center gap-2 rounded-[10px] p-4 hover:bg-aist-green/20 focus:bg-aist-green/20"
        >
            <span
                :class="{ '!font-bold text-aist-green': props.section.current }"
                class="w-full font-semibold"
            >
                {{ section.name }}
            </span>

            <span
                v-if="section.children?.length"
                @click.prevent="active = !active"
                tabindex="0"
                class="flex-none rounded-[10px] p-1 hover:bg-aist-green/20 focus:bg-aist-green/20"
            >
                <i
                    :class="{ '!rotate-0': active }"
                    class="icon-chevron-down block -rotate-90 text-[20px]"
                ></i>
            </span>
        </NuxtLink>

        <template v-if="section.children?.length">
            <CatalogSectionsDropdown :active="active">
                <ul class="mt-2 space-y-2 pl-7">
                    <CatalogSectionsDropdownItem
                        v-for="childrenSection in section.children"
                        :key="childrenSection.id"
                        :as="'li'"
                    >
                        <CatalogSectionsSection :section="childrenSection" />
                    </CatalogSectionsDropdownItem>
                </ul>
            </CatalogSectionsDropdown>
        </template>
    </div>
</template>

<script setup lang="ts">
    interface Section {
        id: string;
        name: string;
        to: string;
        active?: boolean;
        current?: boolean;
        children?: Section[];
    }

    const props = defineProps<{
        section: Section;
    }>();

    const active = ref<boolean>(props.section.active ?? false);
</script>
