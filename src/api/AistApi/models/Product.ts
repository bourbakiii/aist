import dayjs from 'dayjs';
import { productMainSectionFromApi } from '~/api/AistApi/models/ProductMainSection';
import type { ProductMainSection } from '~/api/AistApi/models/ProductMainSection';

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    hasDiscount: boolean;
    step: number;
    stock: number;
    unit: string;
    isFavorite: boolean;
    isAvailable: boolean;
    createdAt: Date;
    images: string[];
    mainSection?: ProductMainSection;
    priceOnline?: number;
    discountPrice?: number;
    minCount?: number;
    weight?: string;
    description?: string;
    manufacturer?: {
        id: string;
        name: string;
        logo?: string;
    };
    brand?: {
        id: string;
        name: string;
        logo?: string;
    };
    meta?: {
        title?: string;
        description?: string;
        ogImage?: string;
    };
}

export function productFromApi(map: Record<string, any>): Product {
    return {
        id: String(map.id),
        name: map.name,
        slug: map.slug,
        price: Number(map.price),
        hasDiscount: map.has_discount,
        step: Number(map.step),
        stock: Number(map.stock),
        unit: map.unit,
        isFavorite: map.is_favorite,
        isAvailable: map.is_available,
        createdAt: dayjs(map.created_at, 'YYYY-MM-DD hh:mm:ss').toDate(),
        images: map.images,
        mainSection: map.main_section ? productMainSectionFromApi(map.main_section) : undefined,
        priceOnline: map.price_online ? Number(map.price_online) : undefined,
        discountPrice: map.discount_price ? Number(map.discount_price) : undefined,
        minCount: map.min_count ? Number(map.min_count) : undefined,
        weight: map.weight ? String(map.weight) : undefined,
        description: map.description,
        manufacturer: map.manufacturer
            ? {
                  id: map.manufacturer.id,
                  name: map.manufacturer.name,
                  logo: map.manufacturer.logo,
              }
            : undefined,
        brand: map.brand
            ? {
                  id: map.brand.id,
                  name: map.brand.name,
                  logo: map.brand.logo,
              }
            : undefined,
        meta: {
            title: map.meta.title,
            description: map.meta.description,
            ogImage: map.meta.og_image,
        },
    };
}
