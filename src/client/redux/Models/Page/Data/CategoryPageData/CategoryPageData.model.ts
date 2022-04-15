import { Product } from "../../../Product/Product.model";

export interface CategoryPageData {
    products: {
        [key: string]: Product;
    };
    length: number
}