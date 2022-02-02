import { Og } from "./Og/Og.model";

export interface Seo {
    title: string;
    description: string;
    og?: Og;
}