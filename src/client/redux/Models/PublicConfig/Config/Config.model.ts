import { PanoramaConfig } from "../PanoramaConfig/PanoramaConfig.model";
import { ReviewPoints } from "./ReviewPoints/ReviewPoints.model";
import { Seo } from "./Seo/Seo.model";

export interface Config {
    reviewPoints?: ReviewPoints[];
    seo: Seo;
    taxPercent: number;
    panoramaConfig: PanoramaConfig;
}