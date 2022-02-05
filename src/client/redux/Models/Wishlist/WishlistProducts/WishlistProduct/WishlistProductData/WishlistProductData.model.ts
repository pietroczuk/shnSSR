import { VariationImage } from "../../../../Product/Variations/Variation/VariationImage/VariationImage.model";
import { Variations } from "../../../../Product/Variations/Variations.model";


export interface WishlistProductData {
    id: string;
    sku: string;
    likes: number;
    variation_image: VariationImage;
    min_price: {
        [key: string]: string;
    };
    variations: Variations;
    titlekey: string;
    title: string;
    url: string;
    variantId: string;
}