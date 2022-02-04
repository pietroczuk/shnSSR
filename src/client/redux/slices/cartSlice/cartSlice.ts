import { createSlice } from '@reduxjs/toolkit';
import { clearLocalStorage, getObjectLength, isObjectEmpty, setLocalStorage } from '../../../utils/utilsFrondend';
import { Cart } from '../../Models/Cart/Cart.model';
// import { setLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLength } from '../../../utils/utilsFrondend';
import CartSliceInitialState from './cartSliceInitialState';

const cartSlice = createSlice({
    name: 'Cart',
    initialState: CartSliceInitialState,
    reducers: {
    
        addToCart(state, action) {
            
            const { product, variantId, localstorageCartKey } = action.payload;
            if (variantId && state && state.products && state.products[variantId]) {
                state.products[variantId].quantity++;
                state.length++;

            } else {
                const productId = product ? product.id : null;
                if (productId && variantId) {
                    // 
                    state.products[variantId] = {
                        p: productId,
                        v: variantId,
                        quantity: 1,
                        productData: product
                    }
                    state.length++;
                }
            }
            if (isObjectEmpty(state.products)) {
                clearLocalStorage(localstorageCartKey);
            } else {
                const localStorageCart = {};
                Object.entries(state.products).forEach(([key, value]) => {
                    localStorageCart[key] = {
                        p: value.p,
                        v: key,
                        quantity: value.quantity
                    }
                });
                setLocalStorage(localStorageCart, localstorageCartKey);
            }
            return state;
        },

        updateCart(state: Cart, action) {
            const productsData = action.payload;
            state.products = productsData;
            state.length = getObjectLength(productsData);
            /** TODO
             *  check number on load from loclastorage
             */
            return state;
        },
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;