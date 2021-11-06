// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import all_reducers from '../../client/redux/reducers/all_reducers';

import { configureStore } from '@reduxjs/toolkit';
import allReducers from '../../client/redux/slices/allReducers';

export default (language = null, currency = null, display_options = null) => {
    const store_init_data = {
        User: {
            language: language,
            currency: currency,
            today: {
                date: new Date().toLocaleString("pl-PL", {timeZone: 'Europe/Warsaw'})
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