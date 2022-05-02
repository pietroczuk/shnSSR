import { Sale } from "../../../Product/Sale/Sale.model";
import { VariationHashmap } from "../../../Product/VariationHashmap/VariationHashmap.model";
import { Variation } from "../../../Product/Variations/Variation/Variation.model";

export interface ProductPageData {
    sku: string;
    colection: string;
    likes: number;
    currentVariationId: string;
    variations: {
        [key: string]: Variation;
    };
    hashmap: VariationHashmap;
    sale: Sale;
}