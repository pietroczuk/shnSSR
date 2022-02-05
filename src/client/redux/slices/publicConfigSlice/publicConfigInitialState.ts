import { PublicConfig } from "../../Models/PublicConfig/PublicConfig.model";

export const PublicConfigInitialState: PublicConfig = {
    defaultVariantCode: {},
    ssr: true,
    translations: {
        cartLabel: '',
        cartStrictLabel: '',
        addToCart: '',

        wishlistLabel: '',
        wishlistStrictLabel: '',
        
        priceFrom: '',
        choiseLabel: '',
        homepage: '',
        showArrangement: '',
        hideArrangement: '',
        showRandom: '',
        hideRandom: '',
    },
    config: {
        seo: {
            title: '',
            description: ''
        }
    },
    features: {}
}