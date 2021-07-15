// export default {
//     api:
//     {
//         'url': 'https://api.shineposters.com/2021/',
//         'config': 'get_config.php'
//     }
// };
import Routes from '../Routes';
export const prepare_routes_config = (api_config) => {
  const api_config_language = Object.keys(api_config.language);
  const multilang_path = '/:lang(' + api_config_language.join('|') + ')';

  let new_Routes = Routes;

  new_Routes[0].routes.map((route_item) => {
    if (route_item.multilang) {
      if (!route_item.server_change) {
        const url_prefix = api_config.urls[route_item.type] ? '/' + api_config.urls[route_item.type] : '';
        route_item.path = multilang_path + url_prefix+ route_item.path;
        route_item.server_change = true;
      }
    }
  });

  // console.log('ok', new_Routes[0].routes);
  // console.log('ok2', Routes[0].routes);
  return new_Routes;
}