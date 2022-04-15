import { createSlice } from '@reduxjs/toolkit';
import { clearLocalStorage, isObjectEmpty, setLocalStorage } from '../../../utils/utilsFrondend';
import { Cart } from '../../Models/Cart/Cart.model';
import { CartProducts } from '../../Models/Cart/CartProducts/CartProducts.model';
// import { setLocalStorage, clearLocalStorage, isObjectEmpty, getObjectLength } from '../../../utils/utilsFrondend';
import CartSliceInitialState from './cartSliceInitialState';

const cartSlice = createSlice({
    name: 'Cart',
    initialState: CartSliceInitialState,
    reducers: {
        addToCart(state: Cart, action) {      
            const { product, variantId, localstorageCartKey } = action.payload;
            if (variantId && state.products && state.products[variantId]) {
                state.products[variantId].quantity++;
                state.length++;
            } else {
                const productId = product ? product.id : null;
                if (productId && variantId) {
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
        updateCartPromoPrice(state: Cart, action) {
            const { variantId, saleEnable } = action.payload;
            const productData = state.products[variantId].productData;
            if(!saleEnable) {
                Object.entries(productData.saveMoney).forEach(([key, _value])=> {
                    productData.saveMoney[key] = 0;
                });
                Object.entries(productData.salePrice).forEach(([key, _value])=> {
                    productData.saveMoney[key] = 0;
                });
            }else{
                Object.entries(productData.saveMoney).forEach(([key, _value])=> {
                    productData.salePrice[key] = 1;
                });
                Object.entries(productData.salePrice).forEach(([key, _value])=> {
                    productData.salePrice[key] = 1;
                });
            }
            console.log('update cart promo')
            return state;
        },
        updateCart(state: Cart, action) {
            const productsData: CartProducts = action.payload;
            if(!isObjectEmpty(productsData)) {
                state.length = Object.entries(productsData).reduce((actual , [_keyCurrent, valueCurrent])=> {
                    return actual + valueCurrent.quantity
                },0);
                state.products = productsData;
            }
            return state;
        },
    }
});
export const cartActions = cartSlice.actions;
export default cartSlice;