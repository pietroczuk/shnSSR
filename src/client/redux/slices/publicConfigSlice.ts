import { createSlice } from '@reduxjs/toolkit';

type PublicConfig = {
    default_variant_code: object,
    ssr: boolean,
    translation: {[key: string]: string},
}

const initialState: PublicConfig = {
    default_variant_code: {},
    ssr: true,
    translation: {}
}

const publicConfigSlice = createSlice({
    name: 'PublicConfig',
    initialState,
    reducers: {
        setPublicConfig(state: PublicConfig, action) {
            const data = action.payload;
            data.ssr = true;
            return data;
        },
        disableSrr(state: PublicConfig) {
            state.ssr = state.ssr ? false : state.ssr;
            return state;
        },
        setSelectedVariantCode(state: PublicConfig, action) {
            const { key, val } = action.payload;
            if (state.default_variant_code[key]) {
                if (state.default_variant_code[key].atrib_id !== val.atrib_id) {
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