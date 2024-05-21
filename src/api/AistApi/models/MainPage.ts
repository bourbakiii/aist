export interface MainPage {
    title: string;
    meta: {
        title?: string;
        description?: string;
        ogImage?: string;
    };
    modules: {
        slider: {
            slides: {
                alt?: string;
                imageSrc: string;
            }[];
        };
        loyaltyBanner: {
            text: string;
        };
        aboutUs: {
            title: string;
            content: string;
        };
    };
}

export function mainPageFromApi(map: Record<string, any>): MainPage {
    const sliderModule = (map['modules'] as any[]).find((m) => m.name === 'slider');
    const loayltyBannerModule = (map['modules'] as any[]).find((m) => m.name === 'loyalty_cta');
    const aboutUsModule = (map['modules'] as any[]).find((m) => m.name === 'info');

    return {
        title: map.title,
        meta: {
            title: map.meta.title,
            description: map.meta.description,
            ogImage: map.meta.og_image,
        },
        modules: {
            slider: {
                slides: (sliderModule.fields.slides as any[]).map((s) => ({
                    alt: s.alt,
                    imageSrc: s.image,
                })),
            },
            loyaltyBanner: {
                text: loayltyBannerModule.fields.text,
            },
            aboutUs: {
                title: aboutUsModule.fields.title,
                content: newLineToParagraph(aboutUsModule.fields.content),
            },
        },
    };
}
