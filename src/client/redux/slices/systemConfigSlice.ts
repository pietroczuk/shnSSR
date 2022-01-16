import { createSlice } from '@reduxjs/toolkit';

interface SystemConfig {
    multilanguage: boolean,
    special_pages_urls: object
}
const initialState: SystemConfig = {
    multilanguage: false,
    special_pages_urls: {}
}

type Action = {
    payload: any
}

const systemConfigSlice = createSlice({ 
    name: 'SystemConfig',
    initialState,
    reducers: {
        setSystemConfig(state:SystemConfig, action: Action) {
            return action.payload;
        }
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;