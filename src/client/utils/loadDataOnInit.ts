import { getPage, getGlobalConfig } from '../redux/actions/actionCreators';

interface loadData {  
        (pageType: string,
        server_store: object,
        api_config: {
            api?: object
        },
        language: string,
        url: string,
        query: string): Promise<any>
}

export const loadDataOnInit:loadData = (pageType, server_store, api_config, language, url, query) => {
    const my_promise = pageType ?
        server_store.dispatch(
            getPage(api_config.api, pageType, language, url, query)
        ) :
        server_store.dispatch(
            getGlobalConfig(api_config, language)
        );
    return my_promise;
}