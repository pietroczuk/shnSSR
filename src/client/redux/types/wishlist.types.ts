import { Product } from "./page.types";

export type WishlistProducts = {
    [key: string]: {
        p: string,
        v: string,
        productData?: Product
    }
}

export interface Wishlist {
    length: number,
    products: WishlistProducts
}