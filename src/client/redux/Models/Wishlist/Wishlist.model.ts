import { WishlistProducts } from "./WishlistProducts/WishlistProducts.model";

export interface Wishlist {
    length: number;
    products?: WishlistProducts;
}