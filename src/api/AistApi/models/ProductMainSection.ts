export interface ProductMainSection {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
    parent?: ProductMainSection;
}

export function productMainSectionFromApi(map: Record<string, any>): ProductMainSection {
    return {
        id: String(map.id),
        name: map.name,
        slug: map.slug,
        parentId: String(map.parent_id),
        parent: map.parent ? productMainSectionFromApi(map.parent) : undefined,
    };
}
