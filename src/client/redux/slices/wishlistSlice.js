import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, getLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLength } from '../../utils/utilsFrondend';

const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: {
        length: 0,
        products: {}
    },
    reducers: {
        initWishlist(state, action) {
            const localstorageWishlistKey = action.payload;
            // check xss
            const localstorageData = getLocalStorage(localstorageWishlistKey);
            if (localstorageData) {
                state.products = localstorageData;
                state.length = getObjectLength(localstorageData);
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
                state.length -= 1;
            } else {
                const productId = product ? product.id : null;
                if (productId && variantId) {
                    // 
                    state.products[variantId] = {
                        p: productId,
                        v: variantId,
                        productData: product
                    }
                    state.length++;
                }
            }
            if (isObjectEmpty(state.products)) {
                clearLocalStorage(localstorageWishlistKey);
            } else {
                const localStorageWishlist = {};
                Object.entries(state.products).forEach(([key, value]) => {
                    localStorageWishlist[key] = {
                        p: value.id,
                        v: key
                    }
                });
                setLocalStorage(localStorageWishlist, localstorageWishlistKey);
            }
            return state;
        }
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;