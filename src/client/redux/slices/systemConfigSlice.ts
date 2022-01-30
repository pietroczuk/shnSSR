import { createSlice } from '@reduxjs/toolkit';
import { SystemConfig } from '../types/systemConfig.types';

const initialState: SystemConfig = {
    product_sliders: {
        visited_count: 0
    },
    localstorage_keys: null,
    urls: null,
    cookies_keys: null,
    special_pages_urls: null,
    multicurrency: false,
    currency: null,
    multilanguage: false,
    placeholder: {
        category_products: 0
    },
    images: null,
    language: null,
    api: null
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