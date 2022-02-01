// export type SingleMenuItem ={
//     label: string,
//     url?: string,
//     image?: number,
//     type?: string,
//     color?: string,
// }

export type MenuItem = {
    label: string,
    url?: string,
    image?: number,
    type?: string,
    color?: string,
    columns? : number,
    items?: MenuItem[]
}

export type Menu = {
    top: MenuItem[],
    side: string
}

export type Config = {
    reviewPoints?: {
        points: number,
        title: string
    }[],
    seo: Seo
}

export type Seo = {
    title: string,
    description: string,
    og?: Og

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
        atributes: AllAtributes
    }
}
export type AllAtributes = {
    [key: string]: Atribute
}
export type Atribute = {
    id: string,
    color: string,
    code: string,
    attrib_title: string,
    attrib_tooltip: string,
    glow_color: string,
    default: boolean
}

export type SingleDefaultVariantCode = {
    atrib_id: string,
    code: string,
    wishlist?: boolean
}
export type DefaultVariantCode = {
    [key: string]: SingleDefaultVariantCode
}
export interface PublicConfig {
    menu?: Menu,
    config: Config,
    translations: {
        [key: string]: string, //Translation,
    }
    features: Features,
    defaultVariantCode: DefaultVariantCode,
    ssr: boolean
}