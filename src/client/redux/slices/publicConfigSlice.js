import { createSlice } from '@reduxjs/toolkit';

const publicConfigSlice = createSlice({ 
    name: 'PublicConfig',
    initialState: {},
    reducers: {
        setPublicConfig(state, action) {
            action.payload.ssr = true;
            return action.payload;
        },
        disableSrr(state) {
            state.ssr = state.ssr ? false : state.ssr;
            return state;
        }
    }
});
export const publicConfigActions = publicConfigSlice.actions;
export default publicConfigSlice;