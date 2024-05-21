import AxiosInstance from '~/axios';
import { AxiosError } from 'axios';
import { sectionFromApi } from './models/Section';
import { mainPageFromApi } from './models/MainPage';
import type { Section } from './models/Section';
import type { Product } from './models/Product';
import type { ProductBasket } from './models/ProductBasket';
import type { Breadcrumbs } from './models/Breadcrumbs';
import { productFromApi } from './models/Product';
import { productBasketFromApi } from './models/ProductBasket';
import type { Order } from './models/Order';
import { orderFromApi } from './models/Order';
import dayjs from 'dayjs';

interface RegisterFieldsErrors {
    name?: string;
    phone?: string;
    email?: string;
    pass?: string;
    agreement?: string;
}

export class RegisterError extends Error {
    fieldErrors: RegisterFieldsErrors;

    constructor(message: string, opts?: RegisterFieldsErrors) {
        super(message);

        this.fieldErrors = opts ?? {};
    }
}

interface LoginFieldsErrors {
    login?: string;
    pass?: string;
}

export class LoginError extends Error {
    fieldErrors: LoginFieldsErrors;

    constructor(message: string, opts?: LoginFieldsErrors) {
        super(message);

        this.fieldErrors = opts ?? {};
    }
}

interface CalcBasketFieldsErrors {
    promocode?: string;
}

export class CalcBasketError extends Error {
    errors: CalcBasketFieldsErrors;

    constructor(message: string, opts?: CalcBasketFieldsErrors) {
        super(message);

        this.errors = opts ?? {};
    }
}

interface MakeOrderFieldsErrors {
    name?: string;
    phone?: string;
    email?: string;
    paymentTypeId?: string;
    deliveryType?: string;
    products?: {
        id: string;
        error: string;
    }[];
    slotId?: string;
    message?: string;
    street?: string;
    house?: string;
    promocode?: string;
}

export class MakeOrderError extends Error {
    errors: MakeOrderFieldsErrors;

    constructor(message: string, opts?: MakeOrderFieldsErrors) {
        super(message);

        this.errors = opts ?? {};
    }
}

const AistApi = {
    async getRelatedProducts(id: string): Promise<Product[]> {
        const response = await AxiosInstance.get(`/product/${id}/related`);

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.products as any[]).map((p) => productFromApi(p));
    },

    async getMainPageSections(): Promise<Section[]> {
        const response = await AxiosInstance.get('/section/main');

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.sections as any[]).map((s) => sectionFromApi(s));
    },

    async getBoughtEarlier(): Promise<Product[]> {
        const response = await AxiosInstance.get('/bought_earlier');

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.products.data as any[]).map((p) => productFromApi(p));
    },

    async makeOrder(data: {
        name: string;
        phone: string;
        email: string;
        paymentTypeId: string;
        deliveryType: string;
        products: {
            id: string;
            count: number;
        }[];
        slotId?: string;
        message?: string;
        street?: string;
        house?: string;
        promocode?: string;
    }) {
        const requestBody = new FormData();

        data.products.forEach((p, index) => {
            requestBody.append(`products[${index}][id]`, p.id);
            requestBody.append(`products[${index}][count]`, p.count.toString());
        });

        requestBody.append('name', data.name);
        requestBody.append('phone', data.phone);
        requestBody.append('email', data.email);
        requestBody.append('payment_type_id', data.paymentTypeId);
        requestBody.append('delivery_type', data.deliveryType);
        requestBody.append('slot_id', data.slotId ?? '');
        requestBody.append('message', data.message ?? '');
        requestBody.append('street', data.street ?? '');
        requestBody.append('house', data.house ?? '');
        requestBody.append('promocode', data.promocode ?? '');

        try {
            const response = await AxiosInstance.post('/order', requestBody);

            if (response.data.success !== true) {
                throw new Error();
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data?.errors) {
                    throw new MakeOrderError(e.message, {
                        name: e.response.data.errors.name?.[0],
                        phone: e.response.data.errors.phone?.[0],
                        email: e.response.data.errors.email?.[0],
                        paymentTypeId: e.response.data.errors.payment_type_id?.[0],
                        deliveryType: e.response.data.errors.delivery_type?.[0],
                        products: (e.response.data.errors.problems as any[])?.map((p) => ({
                            id: p.product_id,
                            error: p.stock,
                        })),
                        slotId: e.response.data.errors.slot_id?.[0],
                        message: e.response.data.errors.message?.[0],
                        street: e.response.data.errors.street?.[0],
                        house: e.response.data.errors.house?.[0],
                        promocode: e.response.data.errors.promocode?.[0],
                    });
                }
            }

            throw new Error();
        }
    },

    async getUser(): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string;
        createdAt: Date;
        gender?: string;
    }> {
        const response = await AxiosInstance.get('/user');

        if (response.data.success !== true) {
            throw new Error();
        }

        return {
            id: String(response.data.user.id),
            name: String(response.data.user.name),
            phone: String(response.data.user.phone),
            email: String(response.data.user.email),
            createdAt: dayjs(response.data.user.created_at, 'YYYY-MM-DD hh:mm:ss').toDate(),
            gender: response.data.user.gender,
        };
    },

    async getPaymentTypes(): Promise<
        {
            id: string;
            name: string;
        }[]
    > {
        const response = await AxiosInstance.get('/payment_type');

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.payment_types as any[]).map((paymentType) => ({
            id: paymentType.id,
            name: paymentType.name,
        }));
    },

    async getSlots(days: number): Promise<
        {
            id: string;
            start: Date;
            end: Date;
        }[]
    > {
        const response = await AxiosInstance.get('/slot', {
            params: {
                days,
            },
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.slots as any[]).map((slot) => {
            const startString = `${slot.date} ${slot.start}`;
            const endString = `${slot.date} ${slot.end}`;

            return {
                id: slot.id,
                start: dayjs(startString, 'YYYY-MM-DD hh:mm').toDate(),
                end: dayjs(endString, 'YYYY-MM-DD hh:mm').toDate(),
            };
        });
    },

    async calcBasket(body: {
        products: {
            id: string;
            count: number;
        }[];
        deliveryTypeId?: string;
        paymentTypeId?: string;
        promocode?: string;
    }): Promise<{
        price: number;
        priceWithoutPromocode: number;
        deliveryPrice: number;
        priceProducts: number;
        promocodeDiscount?: number;
        message?: {
            promocode?: string;
        };
    }> {
        const requestBody = new FormData();

        body.products.forEach((p, index) => {
            requestBody.append(`products[${index}][id]`, p.id);
            requestBody.append(`products[${index}][count]`, p.count.toString());
        });

        if (body.deliveryTypeId) {
            requestBody.append('delivery_type', body.deliveryTypeId);
        }

        if (body.paymentTypeId) {
            requestBody.append('payment_type_id', body.paymentTypeId);
        }

        if (body.promocode) {
            requestBody.append('promocode', body.promocode);
        }

        try {
            const response = await AxiosInstance.post('/order/price', requestBody);

            if (response.data.success !== true) {
                throw new Error();
            }

            return {
                price: Number(response.data.prices.price),
                priceWithoutPromocode: Number(response.data.prices.price_without_promocode),
                deliveryPrice: Number(response.data.prices.delivery_price),
                priceProducts: Number(response.data.prices.products_price),
                promocodeDiscount: response.data.prices.promocode_discount
                    ? Number(response.data.prices.promocode_discount)
                    : undefined,
                message: response.data.message
                    ? {
                          promocode: response.data.message.promocode
                              ? response.data.message.promocode[0]
                              : undefined,
                      }
                    : undefined,
            };
        } catch (e) {
            // if (e instanceof AxiosError) {
            //     if (e.response?.data?.errors) {
            //         throw new CalcBasketError(e.message, {
            //             promocode: e.response.data.errors.promocode?.[0],
            //         });
            //     }
            // }

            throw new Error();
        }
    },

    async search(search: string, page?: number, perPage?: number): Promise<[Product[], number]> {
        const response = await AxiosInstance.get('/search', {
            params: {
                word: search,
                page,
                per_page: perPage,
            },
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return [
            (response.data.products.data as any[]).map((p) => productFromApi(p)),
            response.data.products.last_page,
        ];
    },

    async getFavorites(): Promise<Product[]> {
        const response = await AxiosInstance.get('/favorite/product');

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.products as any[]).map((p) => productFromApi(p));
    },

    async setProductFavorite(productId: string, favorite: boolean) {
        const response = await AxiosInstance.post(`/favorite/product/${productId}`, {
            is_favorite: favorite,
        });

        if (response.data.success !== true) {
            throw new Error();
        }
    },

    async removeProductFromBasket(productBasketId: string) {
        const response = await AxiosInstance.delete(`/basket/${productBasketId}`);

        if (response.data.success !== true) {
            throw new Error();
        }
    },

    async setProductInBasket(productId: string, count: number): Promise<string> {
        const response = await AxiosInstance.post(`/basket`, {
            product_id: productId,
            product_count: count,
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return String(response.data.item.id);
    },

    async addProductToBasket(productId: string, count: number): Promise<string> {
        const response = await AxiosInstance.post('/basket', {
            product_id: productId,
            product_count: count,
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return String(response.data.item.product_id);
    },

    async getBasket(): Promise<ProductBasket[]> {
        const response = await AxiosInstance.get('/basket');

        if (response.data.success !== true) {
            throw new Error();
        }

        return (response.data.products as any[]).map((p) => productBasketFromApi(p));
    },

    async mergeBasket(products: { id: string; count: number }[]): Promise<true> {
        const requestBody = new FormData();

        products.forEach((product, index) => {
            requestBody.append(`products[${index}][id]`, product.id);
            requestBody.append(`products[${index}][count]`, String(product.count));
        });

        const response = await AxiosInstance.post('/basket/merge', requestBody);

        if (response.data.success !== true) {
            throw new Error();
        }

        return true;
    },

    async deleteBusket() {
        const response = await AxiosInstance.delete('/basket');

        if (response.data.success !== true) {
            throw new Error();
        }
    },

    async getSectionProducts(
        id: string,
        perPage: number = 15,
        page?: number,
        sortName?: string,
        sortType?: string
    ): Promise<[Product[], number]> {
        const response = await AxiosInstance.get(`/section/${id}/products`, {
            params: {
                page,
                per_page: perPage,
                'sort[0]': sortName,
                'sort[1]': sortType,
            },
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return [
            (response.data.products.data as any[])?.map((p) => productFromApi(p)),
            Number(response.data.products.last_page),
        ];
    },

    async getSectionOrProduct(
        ...slug: string[]
    ): Promise<[Section, Breadcrumbs] | [Product, Breadcrumbs]> {
        const response = await AxiosInstance.get('/catalog', {
            params: Object.fromEntries(slug.map((s, i) => [`slugs[${i}]`, s])),
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        const breadcrumbs = (response.data.breadcrumbs as any[])?.map((b) => ({
            id: b.id,
            name: b.name,
            slug: b.slug,
        }));

        if (response.data.section) {
            const section = sectionFromApi(response.data.section);

            return [section, breadcrumbs];
        }

        const product = productFromApi(response.data.product);

        return [product, breadcrumbs];
    },

    async getSections() {
        const response = await AxiosInstance.get('/section');

        if (response.data?.success !== true) {
            throw new Error();
        }

        return (response.data.sections as any[]).map((s) => sectionFromApi(s));
    },

    async getSection(slug: string) {
        const response = await AxiosInstance.get(`/section/${slug}`);

        if (response.data?.success !== true) {
            throw new Error();
        }

        return sectionFromApi(response.data.section);
    },

    async register(
        name: string,
        phone: string,
        email: string,
        pass: string,
        passConfirmation: string,
        agreement: boolean
    ) {
        try {
            const response = await AxiosInstance.post('/register', {
                name,
                phone,
                email,
                pass,
                pass_confirmation: passConfirmation,
                agreement,
            });

            if (response.data.success !== true) {
                throw new Error();
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data?.errors) {
                    throw new RegisterError(e.message, {
                        name: e.response.data.errors.name?.[0],
                        phone: e.response.data.errors.phone?.[0],
                        email: e.response.data.errors.email?.[0],
                        pass: e.response.data.errors.pass?.[0],
                        agreement: e.response.data.errors.agreement?.[0],
                    });
                }
            }

            throw new Error();
        }
    },

    async auth(phone: string, pass: string): Promise<string> {
        try {
            const response = await AxiosInstance.post('/login', {
                login: phone,
                pass,
            });

            if (response.data.success !== true) {
                throw new Error();
            }

            return response.data.token;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.data?.errors) {
                    throw new LoginError(e.message, {
                        login: e.response.data.errors.login?.[0],
                        pass: e.response.data.errors.pass?.[0],
                    });
                }
            }

            throw new Error();
        }
    },

    async logout() {
        const response = await AxiosInstance.post('/logout');

        if (response.data.success !== true) {
            throw new Error();
        }
    },

    async getMainPage() {
        const response = await AxiosInstance.get('/main_page');

        if (response.data?.success !== true) {
            throw new Error();
        }

        return mainPageFromApi(response.data.page);
    },

    async getOrder(perPage: number = 15, page?: number): Promise<[Order[], number]> {
        const response = await AxiosInstance.get(`/order`, {
            params: {
                page,
                per_page: perPage,
            },
        });

        if (response.data.success !== true) {
            throw new Error();
        }

        return [
            (response.data.orders.data as any[]).map((p) => orderFromApi(p)),
            Number(response.data.orders.last_page),
        ];
    },

    async getOrderDetail(orderID: number): Promise<Order> {
        const response = await AxiosInstance.get(`/order/${orderID}`, {});

        if (response.data.success !== true) {
            throw new Error();
        }
        return orderFromApi(response.data.order);
    },
};

export default AistApi;
