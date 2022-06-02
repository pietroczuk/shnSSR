import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getPage } from '../redux/actionCreators/page/page.ac';
import { getGlobalConfig } from '../redux/actionCreators/systemConfig/systemConfig.ac';
import { SystemConfig } from '../redux/Models/SystemConfig/SystemConfig.type';
import allReducers from '../redux/slices/allReducers';


interface loadDataOnInit_Args {
    (
        pageType: string,
        // server_store: EnhancedStore,
        // server_store: EnhancedStore,
        useAppDispatch: ThunkDispatch<typeof allReducers, undefined, AnyAction>,
        // useAppDispatch: ThunkDispatch,
        api_config: SystemConfig,
        language: string,
        url: string,
        query: string
    ): Promise<any>
}

export const loadDataOnInit : loadDataOnInit_Args = (
    pageType, 
    // server_store, 
    useAppDispatch,
    api_config, language, url, query

) => {

    // type AppDispatch = typeof server_store.dispatch;

    // const dispatch = useDispatch<AppDispatch>();
    // const dispatch = useDispatch<AppDispatch>();

    // const useAppDispatch = () => useDispatch<AppDispatch>();
    // const dispatch = useAppDispatch()
    // const dispatch = useDispatch()

    // type ConfiguredStore = ReturnType<typeof server_store>;
    // type RootState = ReturnType<typeof server_store.getState> 
    // type AppDispatch = typeof server_store.dispatch;

    // const useAppDispatch = () => useDispatch<AppDispatch>();

    // const dispatch = useAppDispatch();
    
    const my_promise : Promise<any> = pageType ? 
        // server_store.dispatch()
        
        // server_store.dispatch<RootState>(
        useAppDispatch(
            getPage(api_config.api, pageType, language, url, query)
        ) 
        :
        useAppDispatch(
        // server_store.dispatch<RootState>(
            getGlobalConfig(api_config, language)
        );
    return my_promise;
}