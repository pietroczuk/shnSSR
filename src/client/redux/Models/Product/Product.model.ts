import { Sale } from "./Sale/Sale.model";
import { VariationHashmap } from "./VariationHashmap/VariationHashmap.model";
import { Variations } from "./Variations/Variations.model";

export interface Product {
    id: string;
    likes: number;
    title: string;
    titlekey: string;
    url: string;
    variations: Variations;
    minPrice: {
        [key: string]: number;
    }
    salePrice: {
        [key: string]: number;
    }
    saveMoney: {
        [key: string]: number;
    }
    hashmap: VariationHashmap;
    sale: Sale;
}


export interface ProductKeyVal {
    [key: string]: Product;
}