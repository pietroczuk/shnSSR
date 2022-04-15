import { Sale } from '../../../../Product/Sale/Sale.model';
import { VariationImage } from '../../../../Product/Variations/Variation/VariationImage/VariationImage.model';
import { Variations } from '../../../../Product/Variations/Variations.model';
export interface CartProductData {
    id: string;
    sku: string;
    title: string;
    titlekey: string;
    url: string;
    variations: Variations;
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
    variantId: string;
    sale: Sale;
}