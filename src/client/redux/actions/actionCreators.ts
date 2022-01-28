import axios from 'axios';
import { pageTypes, isObjectEmpty, getLocalStorage } from '../../utils/utilsFrondend';

import { systemConfigActions } from '../slices/systemConfigSlice';
import { publicConfigActions } from '../slices/publicConfigSlice';
import { pageActions } from '../slices/pageSlice';
import { userActions } from '../slices/userSlice';
import { displayActions } from '../slices/displaySlice';
import { wishlistActions } from '../slices/wishlistSlice';

/* --------------------- CONFIG 
loads global config
- api urls
- awaible languages, currencies
*/
export const getGlobalConfig = (api_config, lang:string) => async dispatch => {
  if (api_config) {
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
  }
}
/* --------------------- PAGE 
load page based on type
- PRODUCT
*/

export const getPage = (api, type, lang, url, query, axiosAbortController = null) => dispatch => {
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
      { signal: axiosAbortController ? axiosAbortController.signal : null })
      .then(res =>
        dispatch(pageActions.setPageData({ data: res.data, query: query }))
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  }
}

export const setProductCurrVarId = (product_variant_id, variations) => dispatch => {
  if (product_variant_id && variations[product_variant_id]) {
    dispatch(pageActions.setProductCurrentVariantId(product_variant_id))
  }
}

export const setGlobalDefaultVariantcode = (featureKey, value) => dispatch => {
  /**
   * todo: check if feature key exist and attrib id in public config data
   */
  if (featureKey && value) {
    dispatch(publicConfigActions.setSelectedVariantCode({ key: featureKey, val: value }));
  }
}


/*** ----------------------- USER
 * 
 * currencies
 * language etc
 */

export const setUserCurrency = (currency_code, all_currencies, cookieCurrencyKey) => dispatch => {
  if (all_currencies[currency_code]) {
    const actionPayload = { currency_code, cookieCurrencyKey};
    dispatch(userActions.setUserCurrency(actionPayload));
  }
}

/**  ----------------------- Display
 * set product visual
 */

export const setProductVisual = (cookieKey) => dispatch => {
  dispatch(displayActions.setProductVisual(cookieKey));
}
export const setProductRandomColors = (cookieKey, randomValue = null) => dispatch => {
  dispatch(displayActions.setProductRandomColors({ cookieKey: cookieKey, randomValue: randomValue }));
}
/**
 * Add to wishlist
 */

export const addToStoreWishlist = (api, lang, productId, variantId, localstorageWishlistKey, inWishList = false) => dispatch => {
  if (!inWishList) {
    const page_url = '?lang=' + lang + '&variant=' + variantId + '&product=' + productId;
    const axios_endpoint = api.product + page_url;
    return axios.get(api.url + '/' + axios_endpoint)
      .then(res => {
        const productData = res.data.data;
        if (!isObjectEmpty(productData)) {
          return dispatch(wishlistActions.addToWishlist({ product: productData, variantId, localstorageWishlistKey }))
        }
      }
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  } else {
    const actionPayload = { product: null, variantId, localstorageWishlistKey };
    dispatch(wishlistActions.addToWishlist(actionPayload));
  }
}

/**
 * Init wishlist, and check actual wishlist
 * Get wishlist from localstorage  
 */

export const checkWishlist = (initLocalstorageWishlistKey:string|null = null, wishlistState = null, api, language, productUrl = null) => dispatch => {
  const localstorageData = initLocalstorageWishlistKey ? getLocalStorage(initLocalstorageWishlistKey) : null;
  const wishlistData = localstorageData ? localstorageData : wishlistState && wishlistState.products ? wishlistState.products : null;
  if (wishlistData) {
    const wishlistProducts = {};
    Promise.all(Object.entries(wishlistData).map(
      ([key, val]) => {
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
      res.forEach(r => {
        if (r.responseData.status == 200 && !isObjectEmpty(r.responseData.data.data)) {
          wishlistProducts[r.variantId] = {
            p: r.responseData.data.data.id,
            v: r.variantId,
            productData: r.responseData.data.data
          };
        }
      })
      dispatch(wishlistActions.updateWishlist(wishlistProducts));
    }).catch(e => {
      console.error('❌ Error: get multiple wishlist products data from DB', e);
    });
  }
}