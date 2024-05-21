import authorizationModalKey from '~/keys/authorizationModalKey';

export default defineNuxtPlugin({
    hooks: {
        'vue:setup'() {
            const authorizationModalShow = ref<boolean>(false);

            provide(authorizationModalKey, authorizationModalShow);
        },
    },
});
