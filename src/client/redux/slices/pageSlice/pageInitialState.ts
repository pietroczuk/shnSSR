import { Page } from "../../Models/Page/Page.model";

export const pageInitialState : Page = {
    info: {
        type: '',
        id: '',
        url: {},
        title: '',
        description: '',
        seo_title: '',
        seo_description: '',
    },
    data: {
        categoryPage : {
            products:[]
        },
        productPage: {
            colection: '',
            current_variation_id: '',
            likes: 0,
            sku: '',
            variations: {}
        },
        staticPage: {
            body: ''
        }
    }
}