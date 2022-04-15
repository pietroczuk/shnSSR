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
            variations: {}
        },
        staticPage: {
            body: ''
        }
    }
}