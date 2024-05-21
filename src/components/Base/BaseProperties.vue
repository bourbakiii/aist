<template>
    <div
        ref="listNode"
        :class="{
            'max-h-[184px]': !isMobile,
            'max-h-[168px]': isMobile,
        }"
        class="space-y-3 overflow-hidden text-sm lg:space-y-4 lg:text-base"
    >
        <div
            class="flex items-end justify-between"
            v-for="a in attributes"
            ref="linksNodes"
        >
            <span class="text-aist-grey">
                {{ a.title }}
            </span>

            <span class="block h-[1px] max-h-4 min-w-[40px] grow self-end bg-aist-grey"> </span>

            <span
                class="self-end text-aist-black"
                :class="{
                    'font-semibold text-aist-green': a.highlight === true,
                }"
            >
                {{ a.value }}
            </span>
        </div>
    </div>

    <div
        v-if="canShowMore"
        class="mt-4 lg:mt-6"
    >
        <button
            @click="showMore = !showMore"
            class="text-base font-semibold text-aist-green"
        >
            {{ showMore ? 'Скрыть' : 'Показать все' }}
        </button>
    </div>
</template>
<script setup lang="ts">
    import { gsap } from 'gsap';

    const props = defineProps<{
        attributes: {
            title: string;
            value: string;
            highlight?: boolean;
        }[];
    }>();

    const isMobile = ref<boolean>(false);

    onMounted(() => {
        if (!window.matchMedia('(min-width: 1024px)').matches) {
            isMobile.value = true;
        }
    });

    const listNode = ref<HTMLElement | null>(null);
    const linksNodes = ref<HTMLElement[]>([]);

    const visibleAttributes = 5;

    const canShowMore = computed<boolean>(() => {
        return props.attributes.length > visibleAttributes;
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
                height: listNode.value!.scrollHeight,
                ease: 'power1.inOut',
            });

            linksNodes
                .value!.slice(visibleAttributes - props.attributes.length)
                .forEach((el, index) => {
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
            .value!.slice(visibleAttributes - props.attributes.length)
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
            maxHeight: isMobile.value ? 168 : 184,
            ease: 'power1.inOut',
            duration: 0.3,
        });
    });
</script>
