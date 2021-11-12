import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, getLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLenght } from '../../utils/utilsFrondend';

const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: {
        lenght: 0,
        products: {}
    },
    reducers: {
        initWishlist(state, action) {
            const localstorageWishlistKey = action.payload;
            // check xss
            const localstorageData = getLocalStorage(localstorageWishlistKey);
            if (localstorageData) {
                state.products = localstorageData;
                state.lenght = getObjectLenght(localstorageData);
            }
            return state;
        },
        addToWishlist(state, action) {
            /**
             * model products => variantId = {
             *  p: productId,
             *  v: variantId
             * }
             */
            const { product, variantId, localstorageWishlistKey } = action.payload;
            if (variantId && state && state.products && state.products[variantId]) {
                delete state.products[variantId];
                state.lenght -= 1;
            } else {
                const productId = product ? product.id : null;
                if (productId && variantId) {
                    state.products[variantId] = {
                        p: productId,
                        v: variantId,
                    }
                    state.lenght++;
                }
            }
            if (isObjectEmpty(state.products)) {
                clearLocalStorage(localstorageWishlistKey);
            } else {
                setLocalStorage(state.products, localstorageWishlistKey);
            }
            return state;
        }
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;