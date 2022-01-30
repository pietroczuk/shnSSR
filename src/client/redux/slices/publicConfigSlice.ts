import { createSlice } from '@reduxjs/toolkit';

interface PublicConfig {
    default_variant_code: {
        [key: string]: {
            code: string,
            atrib_id: string,
            wishlist: boolean
        }
    },
    ssr: boolean,
    translation: {
        [key: string]: string
    },

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
            const data = state = action.payload;
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