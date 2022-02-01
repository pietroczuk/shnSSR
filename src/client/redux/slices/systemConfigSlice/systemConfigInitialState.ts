import { SystemConfig } from "../../types/systemConfig.types";

export const SystemConfigInitialState: SystemConfig = {
    productSlidersConfig: {
        visitedCount: 0
    },
    localstorageKeys: {
        wishlist: '',
        cart: '',
        visited: ''
    },
    pageTypePrefixUrls: {},
    cookiesKeys: {
        userCountry: '',
        userLanguage: '',
        userCurrency: '',
        displayKeys: {
            visualMode: '',
            randomVariant: ''
        }
    },
    specialPagesUrlsArray: {},
    isMulticurrency: false,
    allCurrencies: {},
    isMultilanguage: false,
    placeholder: {
        category_products: 0
    },
    images: {
        big: '',
        small: '',
        packSize: '',
        packFilename: '',
        url: '',
        smallLess: '',
        medium: '',
        large: '',
        aspectRatioConfig: {
            width: 0,
            height: 0,
        },
    },
    allLanguages: {},
    api: {
        similarvisit: '',
        global: '',
        wishlist: '',
        checkcart: '',
        search: '',
        similarcat: '',
        product: '',
        url: '',
        page: '',
        colection: '',
        checkout_link: '',
        countries: '',
        delivery: '',
        getlocalcart: '',
        similarcol: '',
        reviews: '',
        addtocart: '',
        category: ''
    }
}