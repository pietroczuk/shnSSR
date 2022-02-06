import { Atributes } from "./Atributes/Atributes.model";

export interface SingleFeature {
    id: string;
    feature_title: string;
    feature_display: "color" | "text" | "list";
    wishlist: boolean;
    atributes: Atributes;
}