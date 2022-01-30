export type WishlistProducts = {
    [key: string]: {
        p: string,
        v: string,
        productData?: object
    }
}

export interface Wishlist {
    length: number,
    products: WishlistProducts
}