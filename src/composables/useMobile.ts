export default () => {
    const isMobile = ref<boolean | undefined>();

    function onResize() {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            isMobile.value = false;
        } else {
            isMobile.value = true;
        }
    }

    onMounted(() => {
        onResize();

        window.addEventListener('resize', onResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', onResize);
    });

    return { isMobile };
};
