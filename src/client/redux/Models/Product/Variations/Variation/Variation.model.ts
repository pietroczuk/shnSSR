import { VariationCode } from "./VariationCode/VariationCode.model";
import { VariationImage } from "./VariationImage/VariationImage.model";

export interface Variation {
    id: string,
    variationPrice: {
        [key: string]: string
    },
    variationImage: VariationImage,
    name: string,
    color: string,
    default: boolean,
    variationCode: {
        [key: string]: VariationCode
    }
}