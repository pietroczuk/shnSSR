import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../Models/Cart/Cart.model';
// import { setLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLength } from '../../../utils/utilsFrondend';
import CartSliceInitialState from './cartSliceInitialState';

const cartSlice = createSlice({
    name: 'Cart',
    initialState: CartSliceInitialState,
    reducers: {
        // updateWishlist(state: Wishlist, action) {
        //     const productsData = action.payload;
        //     state.products = productsData;
        //     state.length = getObjectLength(productsData);
        //     return state;
        // },
        addToCart(state: Cart, action) {
            console.log('addToCart', action.payload);
            state.length++;
            return state;
        },
        updateCart(state: Cart, action) {
            console.log('updateCart', action.payload);
            return state;
        }
        /*addToWishlist(state, action) {
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
        */
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;