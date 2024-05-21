import { defineStore } from 'pinia';
import AistApi from '~/api/AistApi/AistApi';
import type { Product } from '~/api/AistApi/models/Product';

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<Product[]>([]);

    async function toggleProductFavorite(product: Product) {
        const newFavorites = favorites.value.slice();

        const productIndexInFavoritesArray = newFavorites.findIndex((p) => p.id === product.id);

        let isFavorite = false;

        if (productIndexInFavoritesArray === -1) {
            isFavorite = false;

            newFavorites.push(product);
        } else {
            isFavorite = true;

            newFavorites.splice(productIndexInFavoritesArray, 1);
        }

        favorites.value = newFavorites;

        await AistApi.setProductFavorite(product.id, !isFavorite);
    }

    async function getFavorites() {
        const products = await AistApi.getFavorites();

        favorites.value = products;
    }

    return { favorites, toggleProductFavorite, getFavorites };
});
