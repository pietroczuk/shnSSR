import { createSlice } from '@reduxjs/toolkit';
import { PublicConfig } from '../../Models/PublicConfig/PublicConfig.model';
import { PublicConfigInitialState } from './publicConfigInitialState';


const publicConfigSlice = createSlice({
    name: 'PublicConfig',
    initialState: PublicConfigInitialState,
    reducers: {
        setPublicConfig(_state: PublicConfig, action) {
            const data =  action.payload;
            data.ssr = true;
            return data;
        },
        disableSrr(state: PublicConfig) {
            state.ssr = state.ssr ? false : state.ssr;
            return state;
        },
        setSelectedVariantCode(state: PublicConfig, action) {
            const { key, val } = action.payload;
            if (state.defaultVariantCode[key]) {
                if (state.defaultVariantCode[key].atribId !== val.atribId) {
                    const wishlist = state.defaultVariantCode[key].wishlist
                    state.defaultVariantCode[key] = val;
                    state.defaultVariantCode[key].wishlist = wishlist;
                }
            }
            return state;
        }
    }
});
export const publicConfigActions = publicConfigSlice.actions;
export default publicConfigSlice;