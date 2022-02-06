import { WishlistProductData } from "./WishlistProductData/WishlistProductData.model";

export type WishlistProduct = {
    p: string;
    v: string;
    quantity? :number;
    productData: WishlistProductData;
}
