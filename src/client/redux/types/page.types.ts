export type SingleProductVariation = {
    variation_price: VariationPrice,
    variation_image: VariationImage,
    variation_code: AllVariationCodes,
    id: string,
}

export type AllVariationCodes = {
    [key: string]: VariationCode
}

export type SingleProductAllVariations = {
    [key: string]: SingleProductVariation
}

export type Product = {
    id: string,
    likes: number,
    title: string,
    titlekey: string,
    url: string,
    variations: SingleProductAllVariations,
    min_price: {
        [key: string]: number
    }
    hashmap: {
        [key: string]: {
            [key: string]: object
        }
    }
}

export type PageData = {
    current_variation_id?: string;
    seo_title: string | null;
    seo_description: string | null;
    title: string;
    description: string;
    variations?: Variations;
    body?: string;
    products?: Product[];
    url?: { [key: string]: string };
    type?: string;
}

export type VariationImage = {
    poster: string,
    wall: string,
    detail: string,
    review: string,
    view360: string,
    allegro_clean: string,
    tesa: string,
}
export type VariationPrice = {
    [key: string]: string
}

export type Variation = {
    name: string,
    color: string,
    default: boolean,
    id: string,
    variation_price: VariationPrice,
    variation_image: VariationImage,
    variation_code: {
        [key: string]: VariationCode
    }
}

export type VariationCode = {
    feature: string,
    code: string,
    atrib_id: string,
    wishlist? : boolean
}

export type Variations = {
    [key: string]: Variation
}

export interface Page {
    type: string,
    data: PageData
}