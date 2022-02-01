export type LocalstorageKeys = {
    wishlist: string,
    cart: string,
    visited: string
}

export type Urls = {
    [key: string]: string
}

export type CookiesKeys = {
    userCountry: string,
    userLanguage: string,
    userCurrency: string,
    displayKeys: CookiesKeysDisplay
}
export type CookiesKeysDisplay = {
    visualMode: string,
    randomVariant: string
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
            isDisplayLeft: boolean,
            default: boolean
        }
    }
}

export type Images = {
    big: string,
    small: string,
    packSize: string,
    packFilename: string,
    url: string,
    smallLess: string,
    medium: string,
    large: string,
    aspectRatioConfig: {
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
    productSlidersConfig: {
        visitedCount: number
    }
    localstorageKeys: LocalstorageKeys
    pageTypePrefixUrls: Urls
    cookiesKeys: CookiesKeys,
    specialPagesUrlsArray: SpecialPagesUrls
    isMulticurrency: boolean
    allCurrencies: Currency,
    isMultilanguage: boolean,
    placeholders: {
        categoryProducts: number
    },
    images: Images,
    allLanguages: Language,
    api: Api
}