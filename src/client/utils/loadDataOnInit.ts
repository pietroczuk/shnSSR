import { EnhancedStore } from '@reduxjs/toolkit';
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
    ): Promise<any>
}

export const loadDataOnInit : loadDataOnInit_Args = (
    pageType, server_store, api_config, language, url, query
    // pageType: string,
    // server_store: EnhancedStore,
    // api_config: SystemConfig,
    // language: string,
    // url: string,
    // query: string
) => {

    // type AppDispatch = typeof server_store.dispatch;

    // const dispatch = useDispatch<AppDispatch>();
    // const dispatch = useDispatch<AppDispatch>();

    // const useAppDispatch = () => useDispatch<AppDispatch>();
    // const dispatch = useAppDispatch()
    // const dispatch = useDispatch()

    // type ConfiguredStore = ReturnType<typeof server_store>;
    type RootState = ReturnType<typeof server_store.getState> 
  
    const my_promise : Promise<any> = pageType ?
        server_store.dispatch<RootState>(
            getPage(api_config.api, pageType, language, url, query)
        ) :
        server_store.dispatch<RootState>(
            getGlobalConfig(api_config, language)
        );
    return my_promise;
}