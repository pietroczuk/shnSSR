import { createSlice } from '@reduxjs/toolkit';
import { setLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLength } from '../../../utils/utilsFrondend';
import { Wishlist } from '../../Models/Wishlist/Wishlist.model';
import WishlistInitialState from './wishlistInitialState';


const wishlistSlice = createSlice({
    name: 'Wishlist',
    initialState: WishlistInitialState,
    reducers: {
        updateWishlist(state: Wishlist, action) {
            const productsData = action.payload;
            state.products = productsData;
            state.length = getObjectLength(productsData);
            return state;
        },
        addToWishlist(state, action) {
            /**
             * model products => variantId = {
             *  p: productId,
             *  v: variantId
             * }
             */
            console.log(action.payload);
            
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
                        p: value.p,
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