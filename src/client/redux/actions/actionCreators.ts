import axios from 'axios';
import { pageTypes, isObjectEmpty, getLocalStorage } from '../../utils/utilsFrondend';

import { systemConfigActions } from '../slices/systemConfigSlice/systemConfigSlice';
import { publicConfigActions } from '../slices/publicConfigSlice/publicConfigSlice';
import { userActions } from '../slices/userSlice/userSlice';
import { displayActions } from '../slices/displaySlice/displaySlice';
import { wishlistActions } from '../slices/wishlistSlice/wishlistSlice';
import { SystemConfig } from '../Models/SystemConfig/SystemConfig.type';
import { Dispatch } from '@reduxjs/toolkit';
import { Wishlist } from '../Models/Wishlist/Wishlist.model';
import { Api } from '../Models/SystemConfig/Api/Api.model';
import { AllCurrencies } from '../Models/SystemConfig/AllCurrencies/AllCurrencies.model';
import { Variations } from '../Models/Product/Variations/Variations.model';
import { WishlistProducts } from '../Models/Wishlist/WishlistProducts/WishlistProducts.model';
import { pageActions } from '../slices/pageSlice/pageSlice';

/* --------------------- CONFIG 
loads global config
- api pageTypePrefixUrls
- awaible allLanguages, allCurrencies
*/
export const getGlobalConfig = (api_config: SystemConfig, lang: string) => async (dispatch: Dispatch) => {
  // if (api_config) {
  dispatch(systemConfigActions.setSystemConfig(api_config));
  const page_url = '?lang=' + lang;
  const axios_endpoint = api_config.api.global + page_url;
  return axios.get(api_config.api.url + '/' + axios_endpoint)
    .then(res =>
      dispatch(publicConfigActions.setPublicConfig(res.data))
    )
    .catch(err => {
      console.error('❌ Error get global variables', err);
    });
  // }
}
/* --------------------- PAGE 
load page based on type
- PRODUCT
*/

export const getPage = (api: Api, type: string, lang: string, url: string, query: string, axiosAbortController?: AbortController) => async (dispatch: Dispatch) => {
  const page_url = '?url=' + url + '&lang=' + lang;
  let axios_endpoint = null;
  switch (type) {
    case pageTypes.productPage:
      axios_endpoint = api.product + page_url;
      break;
    case pageTypes.staticPage:
      axios_endpoint = api.page + page_url;
      break;
    case pageTypes.categoryPage:
      axios_endpoint = api.category + page_url;
      break;
  }
  // console.log(axios_endpoint);
  if (axios_endpoint) {
    return axios.get(api.url + '/' + axios_endpoint,
      { signal: axiosAbortController ? axiosAbortController.signal : undefined })
      .then(res =>
        dispatch(pageActions.setPageData({ data: res.data, query: query, pageType: type}))
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  }
  return undefined;
}

export const setProductCurrVarId = (product_variant_id: string, variations: Variations) => (dispatch: Dispatch) => {
  if (product_variant_id && variations[product_variant_id]) {
    dispatch(pageActions.setProductCurrentVariantId(product_variant_id))
  }
}

export const setGlobalDefaultVariantcode = (featureKey: string, value: object) => (dispatch: Dispatch) => {
  /**
   * todo: check if feature key exist and attrib id in public config data
   */
  if (featureKey && value) {
    dispatch(publicConfigActions.setSelectedVariantCode({ key: featureKey, val: value }));
  }
}


/*** ----------------------- USER
 * 
 * allCurrencies
 * language etc
 */

export const setUserCurrency = (currencyCode: string, allCurrencies: AllCurrencies, cookieCurrencyKey: string) => (dispatch: Dispatch) => {
  if (allCurrencies[currencyCode]) {
    const actionPayload = { currencyCode, cookieCurrencyKey };
    dispatch(userActions.setUserCurrency(actionPayload));
  }
}

/**  ----------------------- Display
 * set product visual
 */

export const setProductVisual = (cookieKey: string) => (dispatch: Dispatch) => {
  dispatch(displayActions.setProductVisual(cookieKey));
}
export const setProductRandomColors = (cookieKey: string, randomValue?: boolean) => (dispatch: Dispatch) => {
  dispatch(displayActions.setProductRandomColors({ cookieKey: cookieKey, randomValue: randomValue }));
}
/**
 * Add to wishlist
 */

export const addToStoreWishlist = (api: Api, lang: string, productId: string, variantId: string, localstorageWishlistKey: string, inWishList = false) => (dispatch: Dispatch) => {
  if (!inWishList) {
    const page_url = '?lang=' + lang + '&variant=' + variantId + '&product=' + productId;
    const axios_endpoint = api.product + page_url;
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
        const axios_endpoint = api.product + page_url;
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