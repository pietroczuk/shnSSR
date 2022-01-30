import { Language, SpecialPagesUrls, Urls } from "../../client/redux/types/systemConfig.types";

export type NewRoutesConfig = {
    language: Language,
    urls: Urls
    special_pages_urls: SpecialPagesUrls
}