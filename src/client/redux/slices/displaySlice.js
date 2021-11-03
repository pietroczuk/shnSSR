import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/utilsFrondend';

const displaySlice = createSlice({
    name: 'Display',
    initialState: {
        showVisual: false,
        showRandom: false,
    },
    reducers: {
        setProductVisual(state) {
            state.showVisual = !state.showVisual;
            setCookie('visual', state.showVisual);
            return state;
        },
        setProductRandomColors(state) {
            state.showRandom = !state.showRandom;
            setCookie('random', state.showRandom);
            return state;
        }
    }
});
export const displayActions = displaySlice.actions;
export default displaySlice;