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
        addToWishlist(state: Wishlist, action) {
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
                        p: value.p,
                        v: key
                    }
                });
                setLocalStorage(localStorageWishlist, localstorageWishlistKey);
            }
            return state;
        },
        updateWishlistPromoPrice(state: Wishlist, action) {
            const { variantId, saleEnable } = action.payload;
            const { saveMoney, salePrice, minPrice, sale, variations } = state.products[variantId].productData;
            // const productData = state.products[variantId].productData;
            const { percent } = sale;
            if (!saleEnable) {
                Object.entries(salePrice).forEach(([key, _value]) => {
                    salePrice[key] = 0;
                });
                Object.entries(saveMoney).forEach(([key, _value]) => {
                    saveMoney[key] = 0;
                });
                Object.entries(variations).forEach(([_key, value]) => {
                    Object.entries(value.salePrice).forEach(([key, _saleValue]) => {
                        value.salePrice[key] = 0;
                    });
                    Object.entries(value.saveMoney).forEach(([key, _saleValue]) => {
                        value.saveMoney[key] = 0;
                    });
                });
                
            } else {
                Object.entries(salePrice).forEach(([key, _value]) => {
                    salePrice[key] = Math.round(minPrice[key] * ((100 - percent) / 100));
                });
                Object.entries(saveMoney).forEach(([key, _value]) => {
                    saveMoney[key] = minPrice[key] - salePrice[key];
                });

                Object.entries(variations).forEach(([_key, value]) => {
                    Object.entries(value.salePrice).forEach(([key, _saleValue]) => {
                        value.salePrice[key] = Math.round(value.variationPrice[key] * ((100 - percent) / 100));
                    });
                    Object.entries(value.saveMoney).forEach(([key, _saleValue]) => {
                        value.saveMoney[key] = value.variationPrice[key] - value.salePrice[key];
                    });
                });
            }
            return state;
        },
    }
});
export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;