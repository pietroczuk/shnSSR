import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import all_reducers from '../../client/redux/reducers/all_reducers';

export default () => {
    const server_store = createStore(all_reducers, {}, applyMiddleware(thunk));
    return server_store;
}