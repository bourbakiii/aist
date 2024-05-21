import type { Product } from '~/api/AistApi/models/Product';
import { productFromApi } from '~/api/AistApi/models/Product';

export interface Section {
    id: string;
    name: string;
    slug: string;
    meta: {
        title?: string;
        description?: string;
        image?: string;
    };
    hasDiscount: boolean;
    children: Section[];
    image?: string;
    description?: string;
    parentId?: string;
    parent?: Section;
    productsCount?: number;
    products?: Product[];
}

export function sectionFromApi(map: Record<string, any>): Section {
    return {
        id: String(map['id']),
        name: map['name'],
        slug: map['slug'],
        meta: {
            title: map['meta']['title'],
            description: map['meta']['description'],
            image: map['meta']['og_image'],
        },
        hasDiscount: map['has_discount'],
        children: (map['children'] as any[])?.map((s) => sectionFromApi(s)) ?? [],
        image: map['image'],
        description: map['description'],
        parentId: map['parent_id'],
        productsCount: map['products_count'],
        products: (map['products'] as any[])?.map((p) => productFromApi(p)),
    };
}
