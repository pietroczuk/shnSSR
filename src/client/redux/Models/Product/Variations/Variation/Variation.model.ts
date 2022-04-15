import { VariationCode } from "./VariationCode/VariationCode.model";
import { VariationImage } from "./VariationImage/VariationImage.model";

export interface Variation {
    id: string,
    variationPrice: {
        [key: string]: number
    },
    variationImage: VariationImage,
    name: string,
    color: string,
    default: boolean,
    variationCode: {
        [key: string]: VariationCode
    }
}