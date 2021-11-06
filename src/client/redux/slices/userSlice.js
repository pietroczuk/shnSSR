import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

const userSlice = createSlice({
    name: 'User',
    initialState: {
        language: '',
        currency: '',
    },
    reducers: {
        // setUserLanguage(state, action, cookieKey) {
        //     setCookie(cookieKey, action.payload);
        //     state.language = action.payload;
        //     return state;
        // },
        setUserCurrency(state, action) {
            const { cookieCurrencyKey, currency_code } = action.payload;
            setCookie(cookieCurrencyKey, currency_code);
            state.currency = currency_code;
            return state;
        },
    }
});
export const userActions = userSlice.actions;
export default userSlice;