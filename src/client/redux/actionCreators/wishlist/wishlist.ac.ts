import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage, isObjectEmpty } from "../../../utils/utilsFrondend";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { Wishlist } from "../../Models/Wishlist/Wishlist.model";
import { WishlistProducts } from "../../Models/Wishlist/WishlistProducts/WishlistProducts.model";
import { wishlistActions } from "../../slices/wishlistSlice/wishlistSlice";
 
export const updateStoreWishlistPromoPrice = (variantId: string, saleEnable: boolean) => (dispatch: Dispatch) => {
  const actionPayload = { variantId, saleEnable };
  return dispatch(wishlistActions.updateWishlistPromoPrice(actionPayload));
}

/**
 * Add to wishlist
 */
export const addToStoreWishlist = (api: Api, lang: string, productId: string, variantId: string, localstorageWishlistKey: string, alreadyInWishlist?:boolean) => (dispatch: Dispatch) => {
  if (!alreadyInWishlist) {
    const page_url = '?lang=' + lang + '&variant=' + variantId + '&product=' + productId;
    const axios_endpoint = api.wishlist + page_url;
    return axios.get(api.url + '/' + axios_endpoint)
      .then(res => {
        const productData = {
          ...res.data.info,
          ...res.data.data
        };
        if (!isObjectEmpty(productData)) {
          return dispatch(wishlistActions.addToWishlist({ product: productData, variantId, localstorageWishlistKey }))
        }
        return null;
      }
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  } else {
    const actionPayload = { product: null, variantId, localstorageWishlistKey };
    return dispatch(wishlistActions.addToWishlist(actionPayload));
  }
}

/**
 * Init wishlist, and check actual wishlist
 * Get wishlist from localstorage  
 */

export const checkWishlist = (initLocalstorageWishlistKey: string, wishlistState: Wishlist, api: Api, language: string) => (dispatch: Dispatch) => {
  const localstorageData = initLocalstorageWishlistKey ? getLocalStorage(initLocalstorageWishlistKey) : null;
  const wishlistData: WishlistProducts = localstorageData ? localstorageData : wishlistState && wishlistState.products ? wishlistState.products : null;
  if (wishlistData) {
    const wishlistProducts: WishlistProducts = {};
    Promise.all(Object.entries(wishlistData).map(
      ([_key, val]) => {
        const variantId = val.v;
        const productId = val.p;
        const page_url = '?lang=' + language + '&variant=' + variantId + '&product=' + productId;
        const axios_endpoint = api.wishlist + page_url;
        return axios.get(api.url + '/' + axios_endpoint)
          .then(res => {
            return {
              variantId: variantId,
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
          wishlistProducts[r.variantId] = {
            p: r.responseData.data.info.id,
            v: r.variantId,
            productData: {
              ...r.responseData.data.info,
              ...r.responseData.data.data
            }
          };
        }
      })
      dispatch(wishlistActions.updateWishlist(wishlistProducts));
    }).catch(e => {
      console.error('❌ Error: get multiple wishlist products data from DB', e);
    });
  }
}