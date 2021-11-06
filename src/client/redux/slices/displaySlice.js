import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

const displaySlice = createSlice({
    name: 'Display',
    initialState: {
        showVisual: false,
        showRandom: false,
    },
    reducers: {
        setProductVisual(state, action) { 
            const cookieKey = action.payload;
            state.showVisual = !state.showVisual;
            setCookie(cookieKey, state.showVisual);
            return state;
        },
        setProductRandomColors(state, action) {
            const cookieKey = action.payload;
            state.showRandom = !state.showRandom;
            setCookie(cookieKey, state.showRandom);
            return state;
        }
    }
});
export const displayActions = displaySlice.actions;
export default displaySlice;