import dayjs from 'dayjs';
import type { ProductOrder } from './ProductOrder';
import { productOrderFromApi } from './ProductOrder';

export interface Order {
    id: string;
    status: {
        id: string;
        name: string;
    };
    paymentType: {
        id: string;
        name: string;
    };
    deliveryType: string;
    prices: {
        price: number;
        deliveryPrice: number;
        priceWithoutPromocode: number;
        promocodeDiscount?: number;
    };
    slot: {
        start: Date;
        end: Date;
    };
    userFriends: {
        name: string;
        email?: string;
        phone: string;
    };
    addressFields: {
        lat: string;
        lon: string;
        house: string;
        street: string;
    };
    products: ProductOrder[];
    createdAt: Date;
    userId: number;
    promocodeId?: number;
}

export function orderFromApi(map: Record<string, any>): Order {
    return {
        id: map.id,
        status: {
            id: map.status.id,
            name: map.status.name,
        },
        paymentType: {
            id: map.payment_type.id,
            name: map.payment_type.name,
        },
        deliveryType: map.delivery_type,
        prices: {
            price: Number(map.prices.price),
            deliveryPrice: Number(map.prices.delivery_price),
            priceWithoutPromocode: Number(map.prices.price_without_promocode),
            promocodeDiscount: map.prices.promocode_discount
                ? Number(map.prices.promocode_discount)
                : undefined,
        },
        slot: {
            end: dayjs(`${map.slot.date} ${map.slot.end}`, 'YYYY-MM-DD hh:mm:ss').toDate(),
            start: dayjs(`${map.slot.date}  ${map.slot.start}`, 'YYYY-MM-DD hh:mm:ss').toDate(),
        },
        userFriends: {
            name: map.user_fields.name,
            email: map.user_fields.email,
            phone: map.user_fields.phone,
        },
        addressFields: {
            lat: map.address_fields?.lat,
            lon: map.address_fields?.lon,
            house: map.address_fields?.house,
            street: map.address_fields?.street,
        },
        products: (map['products'] as any[]).map((s) => productOrderFromApi(s)),
        createdAt: dayjs(map.created_at, 'YYYY-MM-DD hh:mm:ss').toDate(),
        userId: map.user_id,
        promocodeId: map.promocode_id,
    };
}
