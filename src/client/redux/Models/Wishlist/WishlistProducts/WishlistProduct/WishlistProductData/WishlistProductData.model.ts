import { Sale } from "../../../../Product/Sale/Sale.model";
import { VariationImage } from "../../../../Product/Variations/Variation/VariationImage/VariationImage.model";
import { Variations } from "../../../../Product/Variations/Variations.model";


export interface WishlistProductData {
    id: string;
    sku: string;
    likes: number;
    variationImage: VariationImage;
    minPrice: {
        [key: string]: number;
    };
    salePrice: {
        [key: string]: number;
    }
    saveMoney :{
        [key: string]: number;
    }
    variations: Variations;
    titlekey: string;
    title: string;
    url: string;
    variantId: string;
    sale: Sale;
}