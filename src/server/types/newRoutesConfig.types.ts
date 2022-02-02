import { AllLanguages } from "../../client/redux/Models/SystemConfig/AllLanguages/AllLanguages.model";
import { PageTypePrefixUrls } from "../../client/redux/Models/SystemConfig/PageTypePrefixUrls/PageTypePrefixUrls.model";
import { SpecialPagesUrlsArray } from "../../client/redux/Models/SystemConfig/SpecialPagesUrlsArray/SpecialPagesUrlsArray.model";

export type NewRoutesConfig = {
    allLanguages: AllLanguages,
    pageTypePrefixUrls: PageTypePrefixUrls
    specialPagesUrlsArray: SpecialPagesUrlsArray
}