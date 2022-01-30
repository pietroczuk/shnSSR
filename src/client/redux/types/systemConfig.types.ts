export type SystemConfig_Currency = {
    [key: string]: {
        code: string,
        label: string,
        sign: string,
        displayLeft: boolean,
        default: boolean
    }
}
export type SystemConfig_SpecialPagesUrls = {
    [key: string]: {
        [key: string]: string
    }
}
export type SystemConfig_LocalstorageKeys = {
    wishlist?: string,
    cart?: string,
    visited?: string
}
export type SystemConfig_Urls = {
    [key: string]: string
}