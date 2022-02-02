import { CategoryPageData } from "./CategoryPageData/CategoryPageData.model";
import { ProductPageData } from "./ProductPageData/ProductPageData.model";
import { StaticPageData } from "./StaticPageData/StaticPageData.model";

export interface Data {
    id: string;
    seo_title: string;
    seo_description: string;
    title: string;
    description: string;
    url: {
        [key: string]: string;
    }
    staticPage: StaticPageData;
    productPage : ProductPageData;
    categoryPage: CategoryPageData;
}