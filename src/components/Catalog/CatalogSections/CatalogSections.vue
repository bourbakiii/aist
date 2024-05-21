<template>
    <div>
        <ul class="space-y-2">
            <li
                v-for="section in sections"
                :key="section.id"
            >
                <CatalogSectionsSection :section="section" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    export interface Section {
        id: string;
        name: string;
        to: string;
        active?: boolean;
        current?: boolean;
        children?: Section[];
    }

    const props = defineProps<{
        sections: Section[];
    }>();
</script>
