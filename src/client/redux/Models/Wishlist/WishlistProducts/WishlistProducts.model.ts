import { Product } from "../../Product/Product.model";

export interface WishlistProducts {
    [key: string]: {
        p: string,
        v: string,
        productData: Product
    }
}