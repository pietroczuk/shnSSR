import { action_types } from '../actions/action_types';

export default (state = {}, action) => {
    switch (action.type) {
        case action_types.GET_PAGE:         
            if(action.payload) {
                const { data, query } = action.payload;
                    if(query && data.product.variations[query]) {
                        data.product.current_variation_id = query;
                    }
                return data;
            }
            return state;
        case action_types.SET_PRODUCT_CURR_VAR_ID:
            if(action.payload) {
                state.product.current_variation_id = action.payload;
                return {...state};
            }
            return state;
        case action_types.CLEAR_PAGE:
            return {};
        default:
            return state;
    }
}