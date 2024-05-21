<template>
    <div
        v-if=""
        class
    ></div>

    <div class="pb-[36px]">
        <div
            @click.self="onRangeClick"
            ref="rangeNode"
            class="relative z-10 h-2 cursor-pointer rounded-[10px] bg-aist-grey-light"
        >
            <div
                ref="rangeBgNode"
                class="pointer-events-none absolute left-0 right-0 top-0 h-2 rounded-[10px] bg-aist-green"
                :style="`left: ${(initialMinValue / props.maxValue) * 100}%; right: ${
                    100 - (initialMaxValue / props.maxValue) * 100
                }%`"
            >
                <span
                    v-if="showGeneralHint"
                    class="absolute left-1/2 top-[calc(100%_+_16px)] -translate-x-1/2 select-none whitespace-nowrap text-sm font-semibold"
                >
                    {{
                        `${Math.round(props.modelMinValue)} ${props.hintSymbol} – ${Math.round(
                            props.modelMaxValue
                        )} ${props.hintSymbol}`
                    }}
                </span>
            </div>

            <div
                ref="firstButtonWrapper"
                class="absolute left-0 top-1/2"
                :style="`left: ${(initialMinValue / props.maxValue) * 100}%`"
            >
                <BaseRangeSliderButton
                    ref="firstButton"
                    class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <div
                    v-if="!showGeneralHint"
                    class="pointer-events-none absolute top-[calc(100%_+_20px)] -translate-x-1/2 select-none whitespace-nowrap text-sm font-semibold"
                >
                    {{
                        `${Math.round(
                            firstDraggableInstance && secondDraggableInstance
                                ? firstDraggableInstance!.x < secondDraggableInstance!.x
                                    ? props.modelMinValue
                                    : props.modelMaxValue
                                : props.modelMinValue
                        )} ${props.hintSymbol}`
                    }}
                </div>
            </div>

            <div
                ref="secondButtonWrapper"
                class="absolute left-0 top-1/2"
                :style="`left: ${(initialMaxValue / props.maxValue) * 100}%`"
            >
                <BaseRangeSliderButton
                    ref="secondButton"
                    class="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <div
                    v-if="!showGeneralHint"
                    class="pointer-events-none absolute top-[calc(100%_+_20px)] -translate-x-1/2 select-none whitespace-nowrap text-sm font-semibold"
                >
                    {{
                        `${Math.round(
                            firstDraggableInstance && secondDraggableInstance
                                ? secondDraggableInstance!.x < firstDraggableInstance!.x
                                    ? props.modelMinValue
                                    : props.modelMaxValue
                                : props.modelMaxValue
                        )} ${props.hintSymbol}`
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { gsap } from 'gsap';
    import Draggable from 'gsap/Draggable';
    import type { BaseRangeSliderButton } from '#components';

    gsap.registerPlugin(Draggable);

    const props = withDefaults(
        defineProps<{
            minValue?: number;
            maxValue: number;
            modelMinValue: number;
            modelMaxValue: number;
            hintSymbol?: string;
        }>(),
        {
            minValue: 0,
        }
    );

    const initialMinValue = props.modelMinValue;
    const initialMaxValue = props.modelMaxValue;

    const emit = defineEmits<{
        'update:modelMinValue': [value: number];
        'update:modelMaxValue': [value: number];
    }>();

    const rangeNode = ref<HTMLDivElement | null>(null);
    const rangeBgNode = ref<HTMLDivElement | null>(null);

    const firstButtonWrapper = ref<HTMLDivElement | null>(null);
    const secondButtonWrapper = ref<HTMLDivElement | null>(null);

    const firstButton = ref<InstanceType<typeof BaseRangeSliderButton> | null>(null);
    const secondButton = ref<InstanceType<typeof BaseRangeSliderButton> | null>(null);

    let firstDraggableInstance: globalThis.Draggable | null = null;
    let secondDraggableInstance: globalThis.Draggable | null = null;

    onMounted(() => {
        function initDraggable(wrapper: HTMLDivElement, button: HTMLButtonElement) {
            Draggable.create(wrapper, {
                type: 'x',
                bounds: rangeNode.value!,
                onPress: function () {
                    button.focus();

                    button.classList.add('active');
                },
                onRelease: function () {
                    button.classList.remove('active');
                },
                onDrag: function () {
                    const [firstPercentage, secondPercentage] = draggablesPercentages();

                    gsap.set(rangeBgNode.value!, {
                        left: `${
                            firstPercentage < secondPercentage ? firstPercentage : secondPercentage
                        }%`,
                        right: `${
                            100 -
                            (firstPercentage < secondPercentage
                                ? secondPercentage
                                : firstPercentage)
                        }%`,
                    });

                    emitValues();
                    onValueChangeHintObserver();
                },
            });

            return Draggable.get(wrapper);
        }

        firstButtonWrapper.value!.style.left = '';
        secondButtonWrapper.value!.style.left = '';

        firstDraggableInstance = initDraggable(firstButtonWrapper.value!, firstButton.value!.$el);

        secondDraggableInstance = initDraggable(
            secondButtonWrapper.value!,
            secondButton.value!.$el
        );

        onValueChangeHintObserver();

        updateValues(initialMinValue, initialMaxValue);

        window.addEventListener('resize', onResize);
    });

    function onResize() {
        updateValues(props.modelMinValue, props.modelMaxValue);
    }

    let buttonAnimation: GSAPTimeline | null = null;

    function onRangeClick(event: MouseEvent) {
        buttonAnimation?.kill();

        buttonAnimation = gsap.timeline({
            defaults: {
                duration: 0.25,
                ease: 'power1.out',
            },
            onUpdate: () => {
                onValueChangeHintObserver();
            },
            onComplete: () => {
                // Exactly in that order
                updateDraggables();
                emitValues();
            },
        });

        const percentage = (event.offsetX / rangeNode.value!.offsetWidth) * 100;

        const [firstPercentage, secondPercentage] = draggablesPercentages();

        if (Math.abs(firstPercentage - percentage) < Math.abs(secondPercentage - percentage)) {
            buttonAnimation.to(firstButtonWrapper.value!, {
                x: `${event.offsetX}px`,
            });

            if (percentage < secondPercentage) {
                buttonAnimation.to(
                    rangeBgNode.value!,
                    {
                        left: `${percentage}%`,
                    },
                    '<'
                );
            } else {
                buttonAnimation.to(
                    rangeBgNode.value!,
                    {
                        right: `${100 - percentage}%`,
                    },
                    '<'
                );
            }

            firstButton.value!.$el.focus();
        } else {
            buttonAnimation.to(secondButtonWrapper.value!, {
                x: `${event.offsetX}px`,
            });

            if (percentage < firstPercentage) {
                buttonAnimation.to(
                    rangeBgNode.value!,
                    {
                        left: `${percentage}%`,
                    },
                    '<'
                );
            } else {
                buttonAnimation.to(
                    rangeBgNode.value!,
                    {
                        right: `${100 - percentage}%`,
                    },
                    '<'
                );
            }

            secondButton.value!.$el.focus();
        }
    }

    function draggablesPercentages(): [number, number] {
        const calcPercentage = (x: number, maxX: number) => {
            let percentage: number = (x / maxX) * 100;

            return percentage;
        };

        const firstPercentage = calcPercentage(
            firstDraggableInstance!.x,
            firstDraggableInstance!.maxX
        );
        const secondPercentage = calcPercentage(
            secondDraggableInstance!.x,
            secondDraggableInstance!.maxX
        );

        return [firstPercentage, secondPercentage];
    }

    function updateDraggables() {
        firstDraggableInstance!.update();
        secondDraggableInstance!.update();
    }

    function emitValues() {
        const [firstPercentage, secondPercentage] = draggablesPercentages();

        let minValuePercentage: number | null = null;
        let maxValuePercentage: number | null = null;

        if (firstPercentage < secondPercentage) {
            minValuePercentage = firstPercentage;
            maxValuePercentage = secondPercentage;
        } else {
            minValuePercentage = secondPercentage;
            maxValuePercentage = firstPercentage;
        }

        const interpValue = gsap.utils.interpolate(props.minValue, props.maxValue);
        const clampValue = gsap.utils.clamp(props.minValue, props.maxValue);

        emit('update:modelMinValue', clampValue(interpValue(minValuePercentage / 100)));
        emit('update:modelMaxValue', clampValue(interpValue(maxValuePercentage / 100)));
    }

    function updateValues(minValue: number, maxValue: number) {
        const minValuePercentage = valueToRangePercentage(minValue);
        const maxValuePercentage = valueToRangePercentage(maxValue);

        const minValueRangeOffsetX = percentageToRangeOffsetX(minValuePercentage);
        const maxValueRangeOffsetX = percentageToRangeOffsetX(maxValuePercentage);

        gsap.set(firstButtonWrapper.value!, {
            x: `${minValueRangeOffsetX}px`,
        });

        gsap.set(secondButtonWrapper.value!, {
            x: `${maxValueRangeOffsetX}px`,
        });

        gsap.set(rangeBgNode.value!, {
            left: `${minValuePercentage}%`,
            right: `${100 - maxValuePercentage}%`,
        });

        updateDraggables();
    }

    function valueToRangePercentage(value: number) {
        return (value / props.maxValue) * 100;
    }

    function percentageToRangeOffsetX(percentage: number) {
        return rangeNode.value!.offsetWidth * (percentage / 100);
    }

    const showGeneralHint = ref<boolean>(false);

    function onValueChangeHintObserver() {
        const distanceX = Math.abs(
            +gsap.getProperty(firstButtonWrapper.value!, 'x') -
                +gsap.getProperty(secondButtonWrapper.value!, 'x')
        );

        if (distanceX < 70) {
            showGeneralHint.value = true;
            return;
        }

        showGeneralHint.value = false;
    }
</script>
