<template>
    <div
        class="relative overflow-hidden rounded-[10px] border border-aist-grey-light bg-white p-6 lg:p-12"
    >
        <NuxtPicture
            v-if="props.img"
            :src="props.img.src"
            :alt="props.img.alt ?? props.title"
            :img-attrs="{
                class: 'absolute bottom-0 right-0 h-[120px] w-1/2 object-contain object-right-bottom lg:w-[60%] lg:h-[215px]',
            }"
            placeholder
            loading="lazy"
        />

        <div class="mb-4 text-lg font-semibold lg:mb-6 lg:font-Inter lg:text-3xl lg:font-bold">
            {{ props.title }}
        </div>

        <ul
            ref="listNode"
            :class="{
                'max-h-[184px] md:min-h-[184px]': !isMobile,
                'max-h-[148px] md:min-h-[148px]': isMobile,
            }"
            class="space-y-3 overflow-hidden pl-6 text-sm font-semibold text-aist-grey lg:space-y-4 lg:text-base"
        >
            <li
                v-for="link in props.links"
                ref="linksNodes"
            >
                <NuxtLink :to="link.href">
                    {{ link.title }}
                </NuxtLink>
            </li>
        </ul>

        <div
            :class="{ hidden: !canShowMore && isMobile, invisible: !canShowMore && !isMobile }"
            class="mt-4 lg:mt-6"
        >
            <button
                @click="showMore = !showMore"
                class="text-sm font-semibold text-aist-green lg:text-base"
            >
                {{ showMore ? 'Скрыть' : `Ещё ${props.links.length - 5}` }}
            </button>
        </div>

        <div class="mt-6 lg:mt-9 lg:max-w-[150px]">
            <BaseButton
                :to="`/catalog/${props.slug}`"
                :text="'В каталог'"
                :is-big="true"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { gsap } from 'gsap';

    const props = defineProps<{
        title: string;
        slug: string;
        links: {
            id: string;
            title: string;
            href: string;
        }[];
        img?: {
            src: string;
            alt?: string;
        };
    }>();

    const { isMobile } = useMobile();

    const listNode = ref<HTMLElement | null>(null);
    const linksNodes = ref<HTMLElement[]>([]);

    const canShowMore = computed<boolean>(() => {
        return props.links.length > 5;
    });

    const showMore = ref<boolean>(false);

    let animation: GSAPTimeline | null = null;

    watch(showMore, (value) => {
        animation?.kill();

        animation = gsap.timeline({
            defaults: {
                duration: 0.5,
            },
        });

        if (value) {
            animation.to(listNode.value!, {
                maxHeight: listNode.value!.scrollHeight,
                ease: 'power1.inOut',
            });

            linksNodes.value!.slice(5 - props.links.length).forEach((el, index) => {
                // @ts-ignore
                animation!.fromTo(
                    el,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 0.3,
                    },
                    index !== 0 ? '<0.1' : null
                );
            });

            return;
        }

        linksNodes
            .value!.slice(5 - props.links.length)
            .reverse()
            .forEach((el) => {
                animation!.fromTo(
                    el,
                    {
                        opacity: 1,
                    },
                    {
                        opacity: 0,
                        duration: 0.2,
                    },
                    '<'
                );
            });

        animation.to(listNode.value!, {
            maxHeight: isMobile.value ? 148 : 184,
            ease: 'power1.inOut',
            duration: 0.3,
        });
    });
</script>
