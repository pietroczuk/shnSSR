import { Language, SpecialPagesUrls, Urls } from "../../client/redux/types/systemConfig.types";

export type NewRoutesConfig = {
    allLanguages: Language,
    pageTypePrefixUrls: Urls
    specialPagesUrlsArray: SpecialPagesUrls
}