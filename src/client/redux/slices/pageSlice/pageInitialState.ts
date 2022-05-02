import { Page } from "../../Models/Page/Page.model";

export const pageInitialState: Page = {
    info: {
        type: '',
        id: '',
        url: {},
        title: '',
        description: '',
        seo: {
            seoTitle: '',
            seoDescription: '',
        }
    },
    data: {
        categoryPage: {
            products: {},
            length: 0
        },
        productPage: {
            colection: '',
            currentVariationId: '',
            likes: 0,
            sku: '',
            variations: {},
            hashmap: {},
            sale: {
                enable: false,
                percent: 0,
                startSale: 0,
                stopSale: 0
            }

        },
        staticPage: {
            body: ''
        }
    }
}