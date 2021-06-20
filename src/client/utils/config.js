// export default {
//     api:
//     {
//         'url': 'https://api.shineposters.com/2021/',
//         'config': 'get_config.php'
//     }
// };
import Routes from '../Routes';
export const prepare_routes_config = (api_config, server_side = false) => {
    api_config = Object.keys(api_config);//.map(elem => elem.code); // opcjonalnie, dostosowane jedynie do language
    const multilang_path = '/:lang(' + api_config.join('|') + ')';

    // const new_Routes = JSON.parse(JSON.stringify(Routes));
    let new_Routes;
    // if (server) {
    //     // deep copy of array
    //     // new_Routes = Routes.map(item => Array.isArray(item) ? clone(item) : item);
    //     new_Routes = cloneDeeply(Routes);
    //     // console.log(new_Routes);
    // }else{
    //     new_Routes = Routes;
    // }

    new_Routes = Routes;

    new_Routes[0].routes.map((route_item) => {
        if (route_item.multilang) {
            if(!server_side) {
                route_item.path = multilang_path + route_item.path;
            }else{
                if(!route_item.server_change) {
                    route_item.path = multilang_path + route_item.path;
                    route_item.server_change = true;
                }
            }
        }
    });

    // console.log('ok', new_Routes[0].routes);
    // console.log('ok2', Routes[0].routes);
    return new_Routes;
}


/*function cloneDeeply(arrayToClone) {

    var newArray = [];
  
    for (var i = 0; i < arrayToClone.length; i++) {
  
      if (arrayToClone[i].isArray) {
        cloneDeeply(arrayToClone[i])
      }
      else {
        newArray.push(arrayToClone[i])
      }
    }
  
    return newArray;
  }
  */
  
  // Then to use it
  
//   var clone = cloneDeeply(yourArrayToCloneGoesHere);