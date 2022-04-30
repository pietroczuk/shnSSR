import { RouteConfig } from 'react-router-config';
import { NewRoutesConfig } from '../../server/types/newRoutesConfig.types';
import { getRoutes } from '../Routes';

interface prepareRoutesConfigArgs {
    (
        api_config: NewRoutesConfig,
        lang: string,
        isMultilanguage: boolean
    ): RouteConfig[]
}

export const prepareRoutesConfig: prepareRoutesConfigArgs = (api_config, lang, isMultilanguage) => {
    const multilang_path = isMultilanguage ? '/:lang(' + lang + ')/' : '/';
    const new_Routes = getRoutes();
    new_Routes[0].routes.map((route_item) => {
        if (route_item.type) {
            if (!route_item.server_change) {
                const url_prefix = api_config.pageTypePrefixUrls[route_item.type] ? api_config.pageTypePrefixUrls[route_item.type] :
                    api_config.specialPagesUrlsArray[route_item.type][lang] ? api_config.specialPagesUrlsArray[route_item.type][lang] : '';
                route_item.path = multilang_path + url_prefix + route_item.path;
                route_item.server_change = true;
            }
        }
        // console.log(route_item);
    });
    return new_Routes;
}