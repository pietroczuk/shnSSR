import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/utilsFrondend';
import { User } from '../../Models/User/User.model';
import { UserInitialState } from './userInitialState';


type Action = {
    payload: {
        currencyCode: string,
        cookieCurrencyKey: string
    }
}

const userSlice = createSlice({
    name: 'User',
    initialState: UserInitialState,
    reducers: {
        // setUserLanguage(state, action, cookieKey) {
        //     setCookie(cookieKey, action.payload);
        //     state.language = action.payload;
        //     return state;
        // },
        setUserCurrency(state: User, action: Action) {
            const { cookieCurrencyKey, currencyCode } = action.payload;
            setCookie(cookieCurrencyKey, currencyCode);
            state.currency = currencyCode;
            return state;
        },
    }
});
export const userActions = userSlice.actions;
export default userSlice;