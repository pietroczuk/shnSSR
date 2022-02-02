import { VariationCode } from "./VariationCode/VariationCode.model";
import { VariationImage } from "./VariationImage/VariationImage.model";

export interface Variation {
    id: string,
    variation_price: {
        [key: string]: string
    },
    variation_image: VariationImage,
    name: string,
    color: string,
    default: boolean,
    variation_code: {
        [key: string]: VariationCode
    }
}