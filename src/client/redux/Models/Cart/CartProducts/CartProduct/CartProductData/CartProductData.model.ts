import { Variation } from '../../../../Product/Variations/Variation/Variation.model'
export interface CartProductData {
    id: string;
    sku: string;
    title: string;
    titlekey: string;
    url: string;
    variant: Variation;
}