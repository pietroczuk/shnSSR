export type Menu = {
    top: {
        label: string,
        url: string,
        image: number,
        type: string
    }[],
    side: string
}

export type Config = {
    review_points: {
        points: number,
        title: string
    }[],
    seo: Seo
}

export type Seo = {
    title: string,
    description: string,
    og: Og

}
export type Og = {
    type: string,
    image: string,
    url: string,
    site_name: string
}
export type Translation = {
    add_to_cart: string,
    price_from: string,
    wishlist: string,
    cart: string,
    choise: string,
    homepage: string,
    show_arrangement: string,
    hide_arrangement: string,
    show_random: string,
    hide_random: string,
}

export type Features = {
    [key: string]: {
        id: string,
        feature_title: string,
        feature_display: string,
        wishlist: boolean,
        atributes: {
            [key: string]: Atributes
        }
    }
}

export type Atributes = {
    id: string,
    color: string,
    code: string,
    attrib_title: string,
    attrib_tooltip: string,
    glow_color: string,
    default: boolean
}

export type DefaultVariantCode = {
    atrib_id: string,
    code: string,
    wishlist: boolean
}

export interface PublicConfig {
    menu?: Menu,
    config?: Config,
    translation: Translation,
    features: Features,
    default_variant_code: {
        [key: string]: DefaultVariantCode
    },
    ssr: boolean
}