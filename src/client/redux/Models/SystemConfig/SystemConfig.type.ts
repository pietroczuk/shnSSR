import { AllCurrencies } from "./AllCurrencies/AllCurrencies.model"
import { AllLanguages } from "./AllLanguages/AllLanguages.model"
import { Api } from "./Api/Api.model"
import { CookiesKeys } from "./CookiesKeys/CookiesKeys.model"
import { Images } from "./Images/Images.model"
import { LocalstorageKeys } from "./LocalstorageKeys/LocalstorageKeys.model"
import { PageTypePrefixUrls } from "./PageTypePrefixUrls/PageTypePrefixUrls.model"
import { Placeholders } from "./Placeholders/Placeholders.model"
import { ProductSlidersConfig } from "./ProductSlidersConfig/ProductSlidersConfig.model"
import { SpecialPagesUrlsArray } from "./SpecialPagesUrlsArray/SpecialPagesUrlsArray.model"

export interface SystemConfig {
    productSlidersConfig: ProductSlidersConfig;
    localstorageKeys: LocalstorageKeys;
    pageTypePrefixUrls: PageTypePrefixUrls;
    cookiesKeys: CookiesKeys;
    specialPagesUrlsArray: SpecialPagesUrlsArray;
    isMulticurrency: boolean;
    allCurrencies: AllCurrencies;
    isMultilanguage: boolean;
    placeholders: Placeholders;
    images: Images;
    allLanguages: AllLanguages;
    api: Api;
}