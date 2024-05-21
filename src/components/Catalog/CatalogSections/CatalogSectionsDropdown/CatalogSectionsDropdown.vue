<template>
    <div
        ref="dropdownNode"
        class="catalog-sections-dropdown h-0 overflow-hidden"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
    import { gsap } from 'gsap';

    const props = withDefaults(
        defineProps<{
            active?: boolean;
        }>(),
        {
            active: false,
        }
    );

    const dropdownNode = ref<HTMLDivElement | null>(null);

    let animation: GSAPTimeline | null = null;

    watch(
        () => props.active,
        () => {
            props.active ? open() : close();
        }
    );

    function speedUpAnimation() {
        if (animation && animation.isActive()) {
            animation.progress(1);
        }
    }

    onMounted(() => {
        if (props.active) {
            animation = gsap.timeline();

            gsap.set(dropdownNode.value!, {
                height: 'auto',
            });

            dropdownNode
                .value!.querySelectorAll('& > ul > .catalog-sections-dropdown-item')
                .forEach((dropdownItem) => {
                    gsap.set(dropdownItem, {
                        y: 0,
                        opacity: 1,
                    });
                });
        }
    });

    function open() {
        const dropdownSpeed = 0.5;
        const itemSpeed = 0.2;

        speedUpAnimation();

        animation = gsap.timeline();

        animation.to(dropdownNode.value!, {
            height: 'auto',
            duration: dropdownSpeed,
        });

        dropdownNode
            .value!.querySelectorAll('& > ul > .catalog-sections-dropdown-item')
            .forEach((dropdownItem, index) => {
                animation!.fromTo(
                    dropdownItem,
                    {
                        y: -20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: itemSpeed,
                    },
                    index !== 0 ? '<50%' : undefined
                );
            });
    }

    function close() {
        const dropdownSpeed = 0.3;
        const itemSpeed = 0.1;

        speedUpAnimation();

        animation = gsap.timeline();

        dropdownNode
            .value!.querySelectorAll('& > ul > .catalog-sections-dropdown-item')
            .forEach((dropdownItem, index) => {
                animation!.to(
                    dropdownItem,
                    {
                        opacity: 0,
                        duration: itemSpeed,
                    },
                    '<'
                );
            });

        animation.to(dropdownNode.value!, {
            height: 0,
            duration: dropdownSpeed,
            ease: 'power2.out',
        });
    }
</script>
