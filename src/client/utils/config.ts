// export default {
//     api:
//     {
//         'url': 'https://api.shineposters.com/2021/',
//         'config': 'get_config.php'
//     }
// };
import { RouteConfig } from 'react-router-config';
import { getRoutes } from '../Routes';

interface prepareRoutesConfigArgs {
    (
        api_config: {
            urls: {
                [key: string]: string
            },
            special_pages_urls: {
                [key: string]: {
                    [key: string]: string
                }
            }
        },
        lang: string,
        multilanguage: boolean
    ): RouteConfig[]
}

export const prepareRoutesConfig: prepareRoutesConfigArgs = (api_config, lang, multilanguage) => {
    // const api_config_language = Object.keys(api_config.language);
    const multilang_path = multilanguage ? '/:lang(' + lang + ')/' : '/';
    // '/:lang(' + api_config_language.join('|') + ')';

    const new_Routes = getRoutes();
    // console.log(api_config);
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

    // console.log('ok', lang, new_Routes[0].routes);
    // console.log('----', lang, multilanguage, 'from server:', fromServer);
    // console.log('ok2', Routes[0].routes);
    return new_Routes;
}