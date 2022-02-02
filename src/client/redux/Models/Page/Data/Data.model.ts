import { CategoryPageData } from "./CategoryPageData/CategoryPageData.model";
import { ProductPageData } from "./ProductPageData/ProductPageData.model";
import { StaticPageData } from "./StaticPageData/StaticPageData.model";

export interface Data {
    staticPage: StaticPageData;
    productPage : ProductPageData;
    categoryPage: CategoryPageData;
}