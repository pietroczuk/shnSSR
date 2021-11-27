import { createSlice } from '@reduxjs/toolkit';

const publicConfigSlice = createSlice({
    name: 'PublicConfig',
    initialState: {
        default_variant_code: {},
        ssr: true
    },
    reducers: {
        setPublicConfig(state, action) {
            const data = action.payload;
            data.ssr = true;
            return data;
        },
        disableSrr(state) {
            state.ssr = state.ssr ? false : state.ssr;
            return state;
        },
        setSelectedVariantCode(state, action) {
            const { key, val } = action.payload;
            if (state.default_variant_code[key]) {
                if(state.default_variant_code[key].atrib_id !== val.atrib_id) {
                    const wishlist = state.default_variant_code[key].wishlist
                    state.default_variant_code[key] = val;
                    state.default_variant_code[key].wishlist = wishlist;
                }
            }
            return state;
        }
    }
});
export const publicConfigActions = publicConfigSlice.actions;
export default publicConfigSlice;