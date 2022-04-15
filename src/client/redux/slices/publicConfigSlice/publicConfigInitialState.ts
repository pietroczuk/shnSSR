import { PublicConfig } from "../../Models/PublicConfig/PublicConfig.model";

export const PublicConfigInitialState: PublicConfig = {
    defaultVariantCode: {},
    ssr: true,
    translations: {
        cartLabel: '',
        cartStrictLabel: '',
        addToCart: '',
        gotoCart: '',

        wishlistLabel: '',
        wishlistStrictLabel: '',
        gotoWishlist: '',
        
        priceFrom: '',
        choiseLabel: '',
        homepage: '',
        showArrangement: '',
        hideArrangement: '',
        showRandom: '',
        hideRandom: '',

        taxInclude: '',
        tax: '',
        total: '',

        saveMoney: '',
    },
    config: {
        seo: {
            title: '',
            description: ''
        },
        taxPercent: 0
    },
    features: {}
}