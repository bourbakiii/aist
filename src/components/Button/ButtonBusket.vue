<template>
    <BaseButton
        :to="'/cart'"
        :text="toRuPrice(tweenedNumber.number)"
        :leading-icon="'icon-cart'"
        :is-big="true"
        aria-label="Корзина"
    />
</template>

<script setup lang="ts">
    import gsap from 'gsap';
    import { useBasketStore } from '~/stores/BasketStore';

    const basketStore = useBasketStore();

    const tweenedNumber = reactive({
        number: basketStore.totalPrice,
    });

    let animation: GSAPTween | null = null;

    function playAnimation() {
        if (animation && animation.isActive()) {
            animation.progress(1);
        }

        animation = gsap.fromTo(
            tweenedNumber,
            {
                number: tweenedNumber.number,
            },
            {
                number: basketStore.totalPrice,
                ease: 'power4.out',
            }
        );
    }

    watch(
        () => basketStore.totalPrice,
        () => {
            playAnimation();
        }
    );
</script>
