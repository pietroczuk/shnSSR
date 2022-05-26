import { createSlice } from '@reduxjs/toolkit';
import { setCookie, setLocalStorage } from '../../../utils/utilsFrondend';
import { Product } from '../../Models/Product/Product.model';
import { User } from '../../Models/User/User.model';
import { UserInitialState } from './userInitialState';


type ActionCurrency = {
    payload: {
        currencyCode: string,
        cookieCurrencyKey: string
    }
}
type ActionVisisted = {
    payload: {
        productId: string,
        product: Product,
        localstorageVisistedKey: string
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
        setUserCurrency(state: User, action: ActionCurrency) {
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
        },
        addToVisitedProduct(state: User, action: ActionVisisted) {
            const { productId, product, localstorageVisistedKey } = action.payload;
            const visitedProducts = state.visited.products;

            if (!visitedProducts[productId]) {
                visitedProducts[productId] = product;
                const localStorageVisited = [];
                Object.entries(visitedProducts).forEach(([key, _value]) => {
                    localStorageVisited.push(key);
                    // console.log('push', key);
                });
                // console.log('localStorageVisited', localStorageVisited);
                setLocalStorage(localStorageVisited, localstorageVisistedKey);
            }
            return state;
        }

    }
});
export const userActions = userSlice.actions;
export default userSlice;