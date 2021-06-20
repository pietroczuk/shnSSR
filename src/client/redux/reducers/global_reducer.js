import { action_types } from '../actions/action_types';

export default (state = {}, action) => {
    switch (action.type) {
        case action_types.GET_GLOBAL_VARIABLES:
            if (action.payload) {
                return action.payload;
            }
            return state;
        // case action_types.SET_VARIANT_CODE:
        //     if (action.payload) {
        //         const new_state = { ...state };
        //         const { feat_id, code, default_variant, search, variant_id, default_variation_id} = action.payload;

        //         if (!new_state.current_variant || search) {
        //             new_state.current_variant = [...default_variant];
        //         }
        //         const new_current = [];
        //         new_state.current_variant.forEach(variant => {
        //             if (variant.feature == feat_id) {
        //                 new_current.push({ ...variant, 'code': code});
        //             } else {
        //                 new_current.push(variant);
        //             }
        //         });
        //         new_state.current_variant = new_current;
        //         new_state.current_variant_id = variant_id ? variant_id : default_variation_id;
        //         return new_state;
        //     }
        //     return state;
        default:
            return state;
    }
}