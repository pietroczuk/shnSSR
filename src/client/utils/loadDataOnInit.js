import { getPage, getGlobalConfig } from '../redux/actions/actionCreators';

export const loadDataOnInit = (pageType, server_store, api_config, language, url, query) => {
    const my_promise = pageType ?
        server_store.dispatch(
            getPage(api_config.api, pageType, language, url, query)
        ) :
        server_store.dispatch(
            getGlobalConfig(api_config, language)
        );
    return my_promise;
}