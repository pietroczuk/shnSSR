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

        delivery: '',
        change: '',
        freeDelivery: '',
        to: '',
    },
    config: {
        seo: {
            title: '',
            description: ''
        },
        taxPercent: 0,
        panorama: {
            maxWidth: 0,
            maxHeight: 0,
            count: 0,
            perRow: 0,
            speed: 0,
            dragTolerance: 0,
            offsetTopToTriggerAnimation: 0
        },
        imagesAspectRatio: {
            catalog: {
                width: 0,
                height: 0
            },
            productPage: {
                detail: {
                    width: 0,
                    height: 0
                },
                review: {
                    width: 0,
                    height: 0
                },
                pack: {
                    width: 0,
                    height: 0
                }
            }
        },
        placeholders: {
            categoryProducts: 0
        },
        productSlidersConfig: {
            visitedCount: 0
        }
    },

    features: {},
    delivery: {
        globalMinPrice: {},
        countryMinPrice: {},
        countries: null
    }
}