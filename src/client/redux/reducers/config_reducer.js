import { action_types } from '../actions/action_types';

export default (state = {}, action) => {
    switch (action.type) {
        case action_types.GET_GLOBAL_CONFIG_TYPE:
            if(action.payload) {
                return action.payload;
            }
            return state;
        default:
            return state;
    }
}