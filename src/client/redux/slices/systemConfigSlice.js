import { createSlice } from '@reduxjs/toolkit';

const systemConfigSlice = createSlice({ 
    name: 'SystemConfig',
    initialState: {},
    reducers: {
        setSystemConfig(state, action) {
            state = action.payload;
        }
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;