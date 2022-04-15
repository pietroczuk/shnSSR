import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage, isObjectEmpty } from "../../../utils/utilsFrondend";
import { Cart } from "../../Models/Cart/Cart.model";
import { CartProducts } from "../../Models/Cart/CartProducts/CartProducts.model";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { cartActions } from "../../slices/cartSlice/cartSlice";

export const updateStoreCartPromoPrice = (variantId: string, saleEnable: boolean) => (dispatch: Dispatch) => {
  const actionPayload = { variantId, saleEnable };
  return dispatch(cartActions.updateCartPromoPrice(actionPayload));
}

export const addToStoreCart = (api: Api, lang: string, productId: string, variantId: string, localstorageCartKey: string, inCart = false) => (dispatch: Dispatch) => {
    if (!inCart) {
        const page_url = '?lang=' + lang + '&variant=' + variantId + '&product=' + productId;
        const axios_endpoint = api.cart + page_url;
        return axios.get(api.url + '/' + axios_endpoint)
            .then(res => {
                const productData = {
                    ...res.data.info,
                    ...res.data.data
                };
                if (!isObjectEmpty(productData)) {
                    return dispatch(cartActions.addToCart({ product: productData, variantId, localstorageCartKey }))
                }
                return null;
            }
            )
            .catch(err => {
                console.error('❌ Error get data from DB', err);
            });
    } else {
        const actionPayload = { product: null, variantId, localstorageCartKey };
        return dispatch(cartActions.addToCart(actionPayload));
    }
}

export const checkCart = (initLocalstorageCartKey: string, cartState: Cart, api: Api, language: string) => (dispatch: Dispatch) => {
    const localstorageData = initLocalstorageCartKey ? getLocalStorage(initLocalstorageCartKey) : null;
    const cartData: CartProducts = localstorageData ? localstorageData : cartState && cartState.products ? cartState.products : null;
    if (cartData) {
      const cartProducts: CartProducts = {};
      Promise.all(Object.entries(cartData).map(
        ([_key, val]) => {
          const variantId = val.v;
          const productId = val.p;
          const quantity = val.quantity;
          const page_url = '?lang=' + language + '&variant=' + variantId + '&product=' + productId;
          const axios_endpoint = api.cart + page_url;
          return axios.get(api.url + '/' + axios_endpoint)
            .then(res => {
              return {
                variantId: variantId,
                quantity: quantity,
                responseData: res
              }
            })
            .catch(e => {
              console.error('❌ Error get data from DB', e);
            });
        }
      )).then(res => {
        res.forEach((r: any) => {
          if (r.responseData.status == 200 && !isObjectEmpty(r.responseData.data.data)) {
            cartProducts[r.variantId] = {
              p: r.responseData.data.info.id,
              v: r.variantId,
              quantity: r.quantity,
              productData: {
                ...r.responseData.data.info,
                ...r.responseData.data.data
              }
            };
          }
        })
        dispatch(cartActions.updateCart(cartProducts));
      }).catch(e => {
        console.error('❌ Error: get multiple cart products data from DB', e);
      });
    }
  }