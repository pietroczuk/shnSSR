import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import all_reducers from '../../client/redux/reducers/all_reducers';

export default (language = null, currency = null) => {
    const store_init_data = {
        user: {
            language: language,
            currency: currency,
            today: {
                date: new Date().toLocaleString("pl-PL", {timeZone: 'Europe/Warsaw'})
            },
        }
    };
    const server_store = createStore(all_reducers, store_init_data, applyMiddleware(thunk));
    return server_store;
}