import { combineReducers } from 'redux';
import config_reducer from './config_reducer';
import user_reducer from './user_reducer';
import page_reducer from './page_reducer';
import global_reducer from './global_reducer';

export default combineReducers({
    config: config_reducer,
    user: user_reducer,
    page: page_reducer,
    global: global_reducer
});