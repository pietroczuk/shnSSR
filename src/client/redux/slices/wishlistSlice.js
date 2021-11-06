import { createSlice } from '@reduxjs/toolkit';
// import { setCookie } from '../../utils/utilsFrondend';

const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: [],
    reducers: {
        // setProductVisual(state) {
        //     state.showVisual = !state.showVisual;
        //     setCookie('visual', state.showVisual);
        //     return state;
        // },
        // setProductRandomColors(state) {
        //     state.showRandom = !state.showRandom;
        //     setCookie('random', state.showRandom);
        //     return state;
        // }
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;