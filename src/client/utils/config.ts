import { RouteConfig } from 'react-router-config';
import { NewRoutesConfig } from '../../server/types/newRoutesConfig.types';
import { getRoutes } from '../Routes';

interface prepareRoutesConfigArgs {
    (
        api_config: NewRoutesConfig,
        lang: string,
        multilanguage: boolean
    ): RouteConfig[]
}

export const prepareRoutesConfig: prepareRoutesConfigArgs = (api_config, lang, multilanguage) => {
    const multilang_path = multilanguage ? '/:lang(' + lang + ')/' : '/';
    const new_Routes = getRoutes();
    new_Routes[0].routes.map((route_item) => {
        if (route_item.type) {
            if (!route_item.server_change) {
                const url_prefix = api_config.urls[route_item.type] ? api_config.urls[route_item.type] :
                    api_config.special_pages_urls[route_item.type][lang] ? api_config.special_pages_urls[route_item.type][lang] : '';
                route_item.path = multilang_path + url_prefix + route_item.path;
                route_item.server_change = true;
            }
        }
    });
    return new_Routes;
}