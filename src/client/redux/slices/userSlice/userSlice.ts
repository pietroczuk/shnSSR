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
        addSecontToTimer(state: User) {
            // const stateDate = new Date(state.today.date);
            // const newStateDate =  new Date(stateDate.getTime() + 1000);
            // const newStateDateString = newStateDate.toString();
            // state.today.date = newStateDateString;
            // state.today.date += 1000;
            state.today.date++;
            return state;
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;