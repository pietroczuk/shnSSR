import { Config } from "./Config/Config.model"
import { DefaultVariantCode } from "./DefaultVariantCode/DefaultVariantCode.model"
import { Delivery } from "./Delivery/Delivery.model"
import { Features } from "./Features/Features.model"
import { Menu } from "./Menu/Menu.model"
import { Translations } from "./Translations/Translations.model"

export interface PublicConfig {
    menu?: Menu;
    config: Config;
    translations: Translations;
    features: Features;
    defaultVariantCode: DefaultVariantCode;
    delivery: Delivery;
    ssr: boolean;
}