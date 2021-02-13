import { combineReducers } from 'redux';
import feat_reducer from './feat_reducer';

export default combineReducers({
    features: feat_reducer,
})