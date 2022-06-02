// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import all_reducers from '../../client/redux/reducers/all_reducers';

import { configureStore } from '@reduxjs/toolkit';
import { Display } from '../../client/redux/Models/Display/Display.model';
import { User } from '../../client/redux/Models/User/User.model';
import allReducers from '../../client/redux/slices/allReducers';

export const createServerInitStore = (language: string, currency: string, display_options: Display) => {
    const store_init_data: {
        User: User,
        Display: Display
    } = {
        User: {
            language: language,
            currency: currency,
            today: {
                // date: new Date().toLocaleString("pl-PL", { timeZone: 'Europe/Warsaw' })
                date: (new Date().setMilliseconds(0))/1000
            },
            visited: {
                products: {},
                isLoaded: false
            }
        },
        Display: display_options
    };
    const server_store = configureStore({
        reducer: allReducers,
        preloadedState: store_init_data,
    });
    return server_store;
}