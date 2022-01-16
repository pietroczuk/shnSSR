import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

interface User {
    language: string,
    currency: string,
    today: string,
}

const initialState: User = {
    language: '',
    currency: '',
    today: '',
}

type Action = {
    payload: {
        currency_code: string,
        cookieCurrencyKey: string
    }
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        // setUserLanguage(state, action, cookieKey) {
        //     setCookie(cookieKey, action.payload);
        //     state.language = action.payload;
        //     return state;
        // },
        setUserCurrency(state: User, action: Action) {
            const { cookieCurrencyKey, currency_code } = action.payload;
            setCookie(cookieCurrencyKey, currency_code);
            state.currency = currency_code;
            return state;
        },
    }
});
export const userActions = userSlice.actions;
export default userSlice;