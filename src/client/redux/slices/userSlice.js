import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

const userSlice = createSlice({
    name: 'User',
    initialState: {
        language: '',
        currency: '',
    },
    reducers: {
        setUserLanguage(state, action) {
            setCookie('language', action.payload);
            state.language = action.payload;
            return state;
        },
        setUserCurrency(state, action) {
            setCookie('currency', action.payload);
            state.currency = action.payload;
            return state;
        },
    }
});
export const userActions = userSlice.actions;
export default userSlice;