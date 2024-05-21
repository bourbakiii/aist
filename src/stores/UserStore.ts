import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const token = useCookie('token', {
        default: () => ref(''),
    });

    const isAuthenticated = computed(() => {
        return !!token.value;
    });

    function logout() {
        token.value = '';
    }

    return { token, isAuthenticated, logout };
});
