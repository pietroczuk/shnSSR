import { AnyAction, EnhancedStore } from '@reduxjs/toolkit';
import { getPage, getGlobalConfig } from '../redux/actions/actionCreators';
import { SystemConfig } from '../redux/types/systemConfig.types';

interface loadDataOnInit_Args {
    (
        pageType: string,
        server_store: EnhancedStore,
        api_config: SystemConfig,
        language: string,
        url: string,
        query: string
    ): AnyAction
}

export const loadDataOnInit: loadDataOnInit_Args = (pageType, server_store, api_config, language, url, query) => {
    const my_promise = pageType ?
        server_store.dispatch(
            getPage(api_config.api, pageType, language, url, query)
        ) :
        server_store.dispatch(
            getGlobalConfig(api_config, language)
        );
    return my_promise;
}