export type PageData = {
    current_variation_id?: string,
    seo_title: string | null,
    seo_description: string | null
    title: string,
    description: string,
    variations?: Variations,
    body?: string,
    products?: [
        { id: string }
    ]
}

export type Variation = {
    name: string,
    color: string,
    default: boolean,
    id: string,
    variation_price: {
        [key: string]: string
    },
    variation_image: {
        poster: string,
        wall: string,
        detail: string,
        review: string,
        view360: string,
        allegro_clean: string,
        tesa: string,
    },
    variation_code: {
        [key: string]: VariationCode
    }
}

export type VariationCode = {
    feature: string,
    code: string,
    atrib_id: string
}

export type Variations = {
    [key: string]: Variation
}

export interface Page {
    type: string,
    data: PageData
}