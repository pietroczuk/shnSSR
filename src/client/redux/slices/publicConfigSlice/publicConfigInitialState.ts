import { PublicConfig } from "../../Models/PublicConfig/PublicConfig.model";

export const PublicConfigInitialState: PublicConfig = {
    defaultVariantCode: {},
    ssr: true,
    translations: {
        add_to_cart: '',
        price_from: '',
        wishlist: '',
        cart: '',
        choise: '',
        homepage: '',
        show_arrangement: '',
        hide_arrangement: '',
        show_random: '',
        hide_random: '',
    },
    config: {
        seo: {
            title: '',
            description: ''
        }
    },
    features: {}
}