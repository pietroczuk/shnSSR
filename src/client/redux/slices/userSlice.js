import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

const userSlice = createSlice({ 
    name: 'User',
    initialState: {},
    reducers: {
        setUserLanguage(state, action) {
            setCookie('language', action.payload);
            state.language = action.payload;
        },
        setUserCurrency(state, action) {
            setCookie('currency', action.payload);
            state.currency = action.payload;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;