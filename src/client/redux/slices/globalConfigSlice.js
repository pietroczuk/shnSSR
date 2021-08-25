import { createSlice } from '@reduxjs/toolkit';

const globalConfigSlice = createSlice({ 
    name: 'GloablConfig',
    initialState: {},
    reducers: {
        getGlobalConfig(state) {
            return state;
        }
    }
});
export const globalConfigActions = globalConfigSlice.actions;
export default globalConfigSlice;