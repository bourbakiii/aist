<template>
    <div>
        <ul class="flex gap-7">
            <li
                v-for="(link, index) in links"
                :key="link.name"
                class="relative after:absolute after:left-[calc(100%_+_6px)] after:top-1/2 after:h-[1px] after:w-[16px] after:-translate-y-1/2 after:bg-aist-black [&:last-child]:font-semibold [&:last-child]:after:hidden"
            >
                <NuxtLink
                    v-if="link.item"
                    :href="link.item"
                    class="hover:underline focus:underline"
                >
                    <span>
                        {{ link.name }}
                    </span>
                </NuxtLink>

                <span v-else>
                    {{ link.name }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    interface Link {
        name: string;
        item?: string;
    }

    const props = defineProps<{
        links: Link[];
    }>();
</script>
