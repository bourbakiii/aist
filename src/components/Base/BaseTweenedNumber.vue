<template>
    <component :is="props.tag"> {{ toRuPrice(tweenedNumber.number) }}</component>
</template>

<script setup lang="ts">
    import gsap from 'gsap';

    const props = withDefaults(
        defineProps<{
            value: number;
            tag?: string;
        }>(),
        {
            tag: 'div',
        }
    );

    const tweenedNumber = reactive({
        number: 0,
    });

    function animation() {
        gsap.fromTo(
            tweenedNumber,
            {
                number: 0,
            },
            {
                number: props.value,
            }
        );
    }

    onMounted(() => {
        animation();
    });
</script>
