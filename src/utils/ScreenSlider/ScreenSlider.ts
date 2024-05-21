import { gsap } from 'gsap';

interface Options {
    onScreenChange?: () => void;
    /** */
    speed?: number;
    /**  */
    screenSelector?: string;
}

export default class ScreenSlider {
    #el: HTMLElement;
    #slides: {
        id: string;
        el: HTMLElement;
        title?: string;
    }[] = [];
    #options: Options = {
        speed: 0.25,
        screenSelector: '.screen-slider-slide',
    };
    #idStack: string[] = [];
    #animation: GSAPTimeline | null = null;

    constructor(el: HTMLElement, options: Options = {}) {
        this.#el = el;

        for (const key in options) {
            // @ts-ignore
            this.#options[key] = options[key];
        }

        this.#init();
    }

    #init() {
        this.#slides = (
            [...this.#el.querySelectorAll(this.#options.screenSelector!)] as HTMLElement[]
        ).map((el) => {
            return {
                id: el.dataset.screenSliderId ?? '',
                el: el,
                title: el.dataset.screenSliderTitle,
            };
        });

        this.#slides.forEach(({ el: slideEl }) => {
            gsap.set(slideEl, {
                y: -+slideEl.offsetHeight,
            });
        });

        const firstSlide = this.#slides.at(0)!;

        this.#idStack.push(firstSlide.id);

        gsap.set(this.#el, {
            height: firstSlide.el.offsetHeight,
        });

        gsap.set(firstSlide.el, {
            y: 0,
        });
    }

    #getSlideById(id: string) {
        return this.#slides.find((slide) => slide.id == id);
    }

    get currentSlide() {
        return this.#getSlideById(this.#idStack.at(-1)!)!;
    }

    get #prevSlide() {
        const id = this.#idStack.at(-2);

        if (id === undefined) {
            return false;
        }

        return this.#getSlideById(id)!;
    }

    get stackLength() {
        return this.#idStack.length;
    }

    get canGoBack() {
        return this.#prevSlide !== false;
    }

    slideTo(id: string) {
        const newSlide = this.#getSlideById(id);

        if (!newSlide || newSlide === this.currentSlide) {
            return;
        }

        if (this.#animation && this.#animation.isActive()) {
            this.#animation.progress(1);
        }

        this.#animation = gsap.timeline({ defaults: { duration: this.#options.speed } });

        // Slide current
        this.#animation.to(this.currentSlide.el, {
            x: -+this.currentSlide.el.offsetWidth,
            ease: 'power1.in',
        });
        this.#animation.set(this.currentSlide.el, {
            x: 0,
            y: -+this.currentSlide.el.offsetHeight,
        });

        this.#animation.to(this.#el, {
            height: newSlide.el.offsetHeight,
        });

        // Slide next
        this.#animation.fromTo(
            newSlide.el,
            {
                x: newSlide.el.offsetWidth,
                y: 0,
            },
            {
                x: 0,
                ease: 'power1.out',
            },
            '<50%'
        );

        this.#idStack.push(newSlide.id);

        this.#options.onScreenChange?.();
    }

    slideBack() {
        if (this.#prevSlide === false) {
            return;
        }

        if (this.#animation && this.#animation.isActive()) {
            this.#animation.progress(1);
        }

        this.#animation = gsap.timeline({ defaults: { duration: this.#options.speed } });

        // Slide current
        this.#animation.to(this.currentSlide.el, {
            x: +this.currentSlide.el.offsetWidth,
            ease: 'power1.in',
        });
        this.#animation.set(this.currentSlide.el, {
            x: 0,
            y: -+this.currentSlide.el.offsetHeight,
        });

        this.#animation.to(this.#el, {
            height: this.#prevSlide.el.offsetHeight,
        });

        this.#animation.fromTo(
            this.#prevSlide.el,
            {
                x: -+this.#prevSlide.el.offsetWidth,
                y: 0,
            },
            {
                x: 0,
                ease: 'power1.out',
            },
            '<'
        );

        this.#idStack.pop();
        this.#options.onScreenChange?.();
    }
}
