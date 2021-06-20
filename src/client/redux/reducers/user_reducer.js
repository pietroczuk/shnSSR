import { action_types } from '../actions/action_types';
import { setCookie } from '../../utils/utilsFrondend';

export default (state = {}, action) => {
    switch (action.type) {
        case action_types.SET_GLOBAL_LANGUAGE:
            if (action.payload) {
                setCookie('language', action.payload);
                return { ...state, 'language': action.payload };
            }
            return state;
        case action_types.SET_GLOBAL_CURRENCY:
            if (action.payload) {
                // const newState = {...state}
                setCookie('currency', action.payload);
                return { ...state, 'currency': action.payload };
            }
            return state;
        default:
            return state;
    }
}