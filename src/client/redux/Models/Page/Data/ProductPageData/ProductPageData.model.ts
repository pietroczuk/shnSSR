import { Variation } from "../../../Product/Variations/Variation/Variation.model";

export interface ProductPageData {
    sku: string;
    colection: string;
    likes: number;
    current_variation_id: string;
    variations: {
        [key: string]: Variation;
    };
}