import { createSlice } from '@reduxjs/toolkit';
import {
    SystemConfig_Currency,
    SystemConfig_LocalstorageKeys,
    SystemConfig_SpecialPagesUrls,
    SystemConfig_Urls
} from '../types/systemConfig.types';


interface SystemConfig {
    multilanguage: boolean,
    special_pages_urls: SystemConfig_SpecialPagesUrls,
    api: object,
    localstorage_keys: SystemConfig_LocalstorageKeys,
    language: string,
    currency: SystemConfig_Currency,
    urls: SystemConfig_Urls
}
const initialState: SystemConfig = {
    multilanguage: false,
    special_pages_urls: {},
    api: {},
    localstorage_keys: {},
    language: '',
    currency: {},
    urls: {},
}

type Action = {
    payload: SystemConfig
}

const systemConfigSlice = createSlice({
    name: 'SystemConfig',
    initialState,
    reducers: {
        // setSystemConfig(state:SystemConfig, action: {payload: any}) {
        setSystemConfig(state: SystemConfig, action: Action) {
            return state = action.payload;
        }
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;