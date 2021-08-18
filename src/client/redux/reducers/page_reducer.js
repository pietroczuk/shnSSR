import { action_types } from '../actions/action_types';

export default (state = {}, action) => {
    switch (action.type) {
        case action_types.GET_PAGE:         
            if(action.payload) {
                const { data, query } = action.payload;
                    if(query && data.data.variations[query]) {
                        data.data.current_variation_id = query;
                    }
                return data;
            }
            return state;
        case action_types.SET_PRODUCT_CURR_VAR_ID:
            if(action.payload) {
                state.data.current_variation_id = action.payload;
                return {...state};
            }
            return state;
        case action_types.CLEAR_PAGE:
            return {};
        default:
            return state;
    }
}