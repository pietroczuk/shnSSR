import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, getLocalStorage } from '../../utils/utilsFrondend';

const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: {},
    reducers: {
        initWishlist(state, action) {
            const localstorageWishlistKey = action.payload;
            // check xss
            return state = getLocalStorage(localstorageWishlistKey);
        },
        addToWishlist(state, action) {
            /**
             * model: variantId = {
             *  p: productId,
             *  v: variantId
             * }
             */
            const { product, variantId, localstorageWishlistKey } = action.payload;
            const productId = product ? product.id : null;
            if (productId && variantId) {
                state = state ? state : {};
                state[variantId] = {
                    p: productId,
                    v: variantId,
                }
            }
            // save all state in localstorage
            setLocalStorage(state, localstorageWishlistKey);
            return state;
        }
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;