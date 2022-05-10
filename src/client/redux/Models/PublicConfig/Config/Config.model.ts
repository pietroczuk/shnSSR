import { Placeholders } from "../../SystemConfig/Placeholders/Placeholders.model";
import { ProductSlidersConfig } from "../../SystemConfig/ProductSlidersConfig/ProductSlidersConfig.model";
import { PanoramaConfig } from "../PanoramaConfig/PanoramaConfig.model";
import { AspectRatio } from "./AspectRatio/AspectRatio.model";
import { ReviewPoints } from "./ReviewPoints/ReviewPoints.model";
import { Seo } from "./Seo/Seo.model";

export interface Config {
    reviewPoints?: ReviewPoints[];
    seo: Seo;
    taxPercent: number;
    panorama: PanoramaConfig;
    imagesAspectRatio: {
        catalog: AspectRatio;
        productPage: {
            [key: string]: AspectRatio;
        }
    };
    placeholders: Placeholders;
    productSlidersConfig: ProductSlidersConfig;
}