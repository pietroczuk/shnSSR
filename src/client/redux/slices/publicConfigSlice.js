import { createSlice } from '@reduxjs/toolkit';

const publicConfigSlice = createSlice({ 
    name: 'PublicConfig',
    initialState: {},
    reducers: {
        setPublicConfig(state, action) {
            state = action.payload;
        }
    }
});
export const publicConfigActions = publicConfigSlice.actions;
export default publicConfigSlice;