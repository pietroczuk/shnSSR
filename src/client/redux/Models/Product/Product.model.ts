import { Variations } from "./Variations/Variations.model";

export interface Product {
    id: string;
    likes: number;
    title: string;
    titlekey: string;
    url: string;
    variations: Variations;
    min_price: {
        [key: string]: string;
    }
    hashmap: {
        [key: string]: {
            [key: string]: string[];
        }
    }
    sale: boolean;
    startsale: string;
    stopsale: string;
    salePercent: number;
}