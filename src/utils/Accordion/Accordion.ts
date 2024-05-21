import { gsap } from 'gsap';

interface Options {
    speed?: number;
    itemSelector?: string;
    triggerSelector?: string;
    dropdownSelector?: string;
}

export default class Accordion {
    #el: HTMLElement;
    #items: {
        trigger: HTMLElement;
        dropdown: HTMLElement;
    }[] = [];
    #activeIndex: number | false = false;
    #options: Options = {
        speed: 0.3,
        itemSelector: '.accordion-item',
        triggerSelector: '.accordion-trigger',
        dropdownSelector: '.accordion-dropdown',
    };
    #animation: GSAPTimeline | null = null;

    constructor(el: HTMLElement, options: Options = {}) {
        this.#el = el;

        for (const key in options) {
            // @ts-ignore
            this.#options[key] = options[key];
        }

        this.#init();
    }

    get activeItem() {
        if (this.#activeIndex === false) {
            return null;
        }

        return this.#items.at(this.#activeIndex)!;
    }

    #init() {
        this.#items = (
            [...this.#el.querySelectorAll(this.#options.itemSelector!)] as HTMLElement[]
        ).map((el) => ({
            trigger: el.querySelector(this.#options.triggerSelector!) as HTMLElement,
            dropdown: el.querySelector(this.#options.dropdownSelector!) as HTMLElement,
        }));

        this.#items.forEach((item, index) => {
            item.trigger.addEventListener('click', () => {
                if (this.#activeIndex === index) {
                    this.closeTab();

                    return;
                }

                this.openTab(index);
            });
        });
    }

    closeTab(): boolean {
        if (!this.activeItem) {
            return false;
        }

        if (this.#animation && this.#animation.isActive()) {
            this.#animation.progress(1);
        }

        this.#animation = gsap.timeline({ defaults: { duration: this.#options.speed } });

        this.#animation.to(this.activeItem.dropdown, {
            height: 0,
            opacity: 0,
        });

        this.activeItem.trigger.classList.remove('active');
        this.#activeIndex = false;

        return true;
    }

    openTab(index: number, speed?: number): boolean {
        if (index === this.#activeIndex) {
            return false;
        }

        const newItem = this.#items.at(index);

        if (!newItem) {
            return false;
        }

        if (this.#animation && this.#animation.isActive()) {
            this.#animation.progress(1);
        }

        this.#animation = gsap.timeline({ defaults: { duration: speed ?? this.#options.speed } });

        if (this.activeItem) {
            this.#animation.to(this.activeItem.dropdown, {
                height: 0,
                opacity: 0,
            });
        }

        this.#animation.to(newItem.dropdown, {
            height: 'auto',
            opacity: 1,
        });

        this.activeItem?.trigger.classList.remove('active');

        this.#activeIndex = index;
        this.activeItem?.trigger.classList.add('active');

        return true;
    }
}
