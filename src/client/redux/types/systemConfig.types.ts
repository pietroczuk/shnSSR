export type LocalstorageKeys = {
    wishlist?: string,
    cart?: string,
    visited?: string
}

export type Urls = {
    [key: string]: string
}

export type CookiesKeys = {
    user_country: string,
    user_language: string,
    user_currency: string,
    display: CookiesKeysDisplay
}
export type CookiesKeysDisplay = {
    visual_mode: string,
    random_variant: string
}

export type SpecialPagesUrls = {
    [key: string]: {
        [key: string]: string
    }
}

export type Currency = {
    [key: string]: {
        [key: string]: {
            code: string,
            label: string,
            sign: string,
            displayLeft: boolean,
            default: boolean
        }
    }
}

export type Images = {
    big: string,
    small: string,
    pack_size: string,
    pack_filename: string,
    url: string,
    small_less: string,
    medium: string,
    large: string,
    aspect_ratio: {
        width: number,
        height: number
    },
}

export type Language = {
    [key: string]: {
        code: string,
        label: string,
        flag_image: string,
        default: boolean
    }
}

export type Api = {
    similarvisit: string,
    global: string,
    wishlist: string,
    checkcart: string,
    search: string,
    similarcat: string,
    product: string,
    url: string,
    page: string,
    colection: string,
    checkout_link: string,
    countries: string,
    delivery: string,
    getlocalcart: string,
    similarcol: string,
    reviews: string,
    addtocart: string,
    category: string
}

export interface SystemConfig {
    product_sliders: {
        visited_count: number
    }
    localstorage_keys: LocalstorageKeys
    urls: Urls
    cookies_keys: CookiesKeys,
    special_pages_urls: SpecialPagesUrls
    multicurrency: boolean
    currency: Currency,
    multilanguage: boolean,
    placeholder: {
        category_products: number
    },
    images: Images,
    language: Language,
    api: Api
}