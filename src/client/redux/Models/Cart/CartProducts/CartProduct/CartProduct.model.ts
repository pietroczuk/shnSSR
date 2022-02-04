import { CartProductData } from "./CartProductData/CartProductData.model";

export interface CartProduct {
    p: string;
    v: string;
    quantity: number;
    productData: CartProductData;
}