import { Product } from "../Product/Product.model";

export interface User {
    language: string;
    currency: string;
    today: {
        date: number;
    },
    visitedProducts: {
        [key: string]: Product;
    };
}