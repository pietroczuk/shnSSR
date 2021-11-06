import { createSlice } from '@reduxjs/toolkit';
import { getLocalStorageWishlist } from '../../utils/utilsFrondend';

const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: null,
    reducers: {
        initWishlist(state, action) {
            const localstorageWishlistKey = action.payload;
            return state = getLocalStorageWishlist(localstorageWishlistKey);
        }
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;