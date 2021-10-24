import { pageTypes } from './utilsFrondend';
import { getPage } from '../redux/actions/actionCreators';

export const loadDataOnInit = (server_store, api_config, language, url, query) => {
    const my_promise = server_store.dispatch(
        getPage(api_config.api, pageTypes.productPage, language, url, query)
    );
    return my_promise;
}