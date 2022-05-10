import { SystemConfig } from "../../Models/SystemConfig/SystemConfig.type";

export const SystemConfigInitialState: SystemConfig = {
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
    images: {
        big: '',
        small: '',
        packSize: '',
        packFilename: '',
        url: '',
        smallLess: '',
        medium: '',
        large: ''
    },
    allLanguages: {},
    api: {
        similarvisit: '',
        global: '',
        wishlist: '',
        cart: '',
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