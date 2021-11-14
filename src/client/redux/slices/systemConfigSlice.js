import { createSlice } from '@reduxjs/toolkit';

const systemConfigSlice = createSlice({ 
    name: 'SystemConfig',
    initialState: {},
    reducers: {
        setSystemConfig(state, action) {
            return action.payload;
        },
        setAbortController(state, action) {
            state.AxiosAbortController = new AbortController();
            // console.log(AxiosAbortController);
            return state;
        }
        // export const AxiosAbortController = new window.AbortController();
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;