import { ProductKeyVal } from "../Product/Product.model";

export interface User {
    language: string;
    currency: string;
    today: {
        date: number;
    },
    visited: {
        products: ProductKeyVal,
        isLoaded: boolean;
    };
}