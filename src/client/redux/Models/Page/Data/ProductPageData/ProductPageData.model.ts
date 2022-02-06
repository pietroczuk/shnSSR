import { Variation } from "../../../Product/Variations/Variation/Variation.model";

export interface ProductPageData {
    sku: string;
    colection: string;
    likes: number;
    currentVariationId: string;
    variations: {
        [key: string]: Variation;
    };
}