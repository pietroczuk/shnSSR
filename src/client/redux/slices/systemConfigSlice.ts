import { createSlice } from '@reduxjs/toolkit';

interface SystemConfig {
    multilanguage: boolean,
    special_pages_urls: {
        [key: string]:
        {
            [key: string]: string
        }
    },
    api: object,
    localstorage_keys: {
        wishlist: string,
        cart: string,
        visited: string
    },
    language: string,
    currency: string,
    urls: { [key: string]: string }
}
const initialState: SystemConfig = {
    multilanguage: false,
    special_pages_urls: {},
    api: {},
    localstorage_keys: {
        wishlist: '',
        cart: '',
        visited: '',
    },
    language: '',
    currency: '',
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
            return action.payload;
        }
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;