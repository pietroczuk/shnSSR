// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import all_reducers from '../../client/redux/reducers/all_reducers';

import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../../client/redux/slices/allReducers';
import { Display } from '../../client/redux/types/display.types';
import { User } from '../../client/redux/types/user.types';

export const createServerInitStore = (language: string, currency: string, display_options: Display) => {
    const store_init_data: {
        User: User,
        Display: Display
    } = {
        User: {
            language: language,
            currency: currency,
            today: {
                date: new Date().toLocaleString("pl-PL", { timeZone: 'Europe/Warsaw' })
            },
        },
        Display: display_options
    };
    const server_store = configureStore({
        reducer: allReducers,
        preloadedState: store_init_data
    });
    // const server_store = createStore(all_reducers, store_init_data, applyMiddleware(thunk));
    return server_store;
}