import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../../utils/utilsFrondend';
import { DisplayInitialState } from './displayInitialState';

const displaySlice = createSlice({
    name: 'Display',
    initialState: DisplayInitialState,
    reducers: {
        setProductVisual(state, action) {
            const cookieKey = action.payload;
            state.showVisual = !state.showVisual;
            setCookie(cookieKey, state.showVisual.toString());
            return state;
        },
        setProductRandomColors(state, action) {
            const { cookieKey, randomValue } = action.payload;
            state.showRandom = randomValue !== undefined ? randomValue : !state.showRandom;
            setCookie(cookieKey, state.showRandom.toString());
            return state;
        }
    }
});
export const displayActions = displaySlice.actions;
export default displaySlice;