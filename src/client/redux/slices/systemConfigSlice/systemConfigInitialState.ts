import { SystemConfig } from "../../types/systemConfig.types";

export const SystemConfigInitialState: SystemConfig = {
    product_sliders: {
        visited_count: 0
    },
    localstorage_keys: {},
    urls: {},
    cookies_keys: {
        user_country: '',
        user_language: '',
        user_currency: '',
        display: {
            visual_mode: '',
            random_variant: ''
        }
    },
    special_pages_urls: {},
    multicurrency: false,
    currency: {},
    multilanguage: false,
    placeholder: {
        category_products: 0
    },
    images: {
        big: '',
        small: '',
        pack_size: '',
        pack_filename: '',
        url: '',
        small_less: '',
        medium: '',
        large: '',
        aspect_ratio: {
            width: 0,
            height: 0,
        },
    },
    language: {},
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