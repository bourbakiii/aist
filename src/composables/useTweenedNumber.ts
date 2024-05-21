import gsap from 'gsap';

export default (number: Ref<number>) => {
    const tweenedNumber = reactive({
        number: number.value,
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
                number: number.value,
                ease: 'power4.out',
            }
        );
    }

    watch(number, () => {
        playAnimation();
    });

    return { tweenedNumber };
};
