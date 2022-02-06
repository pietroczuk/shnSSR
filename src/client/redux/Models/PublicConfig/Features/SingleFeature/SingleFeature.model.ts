import { Atributes } from "./Atributes/Atributes.model";

export interface SingleFeature {
    id: string;
    featureTitle: string;
    featureDisplay: "color" | "text" | "list";
    wishlist: boolean;
    atributes: Atributes;
}