import dayjs from 'dayjs';
import type { Product } from '~/api/AistApi/models/Product';
import { productMainSectionFromApi } from '~/api/AistApi/models/ProductMainSection';

export interface ProductOrder extends Product {
    orderFields: {
        count: number;
        price: number;
        discountPrice?: number;
    };
}

export function productOrderFromApi(map: Record<string, any>): ProductOrder {
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
        orderFields: {
            count: Number(map.order_fields.count),
            price: Number(map.order_fields.price),
            discountPrice: map.order_fields.price_discount
                ? Number(map.order_fields.price_discount)
                : undefined,
        },
    };
}
