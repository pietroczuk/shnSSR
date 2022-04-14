import { Variations } from "./Variations/Variations.model";

export interface Product {
    id: string;
    likes: number;
    title: string;
    titlekey: string;
    url: string;
    variations: Variations;
    minPrice: {
        [key: string]: string;
    }
    hashmap: {
        [key: string]: {
            [key: string]: string[];
        }
    }
    sale: {
        enable: boolean,
        startSale: number | null,
        stopSale: number | null,
        percent: number | null
    } | null
}