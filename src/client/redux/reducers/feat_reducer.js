import { action_types } from '../actions/action_types';

export default (state = [], action) => {
    switch (action.type) {
        case action_types.GET_GLOBAL_FEAT_TYPE:
            if (action.payload.data.feat) {
                return action.payload.data.feat;
            }
            return state;
        default:
            return state;
    }
}