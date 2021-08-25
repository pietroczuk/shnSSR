import { action_types } from './action_types';
import axios from 'axios';
import { pageTypes } from '../../utils/utilsFrondend';

import { systemConfigActions } from '../slices/systemConfigSlice';
import { publicConfigActions } from '../slices/publicConfigSlice';
import { pageActions } from '../slices/pageSlice';
import { userActions } from '../slices/userSlice';

/* --------------------- CONFIG 
loads global config
- api urls
- awaible languages, currencies
*/
export const getGlobalConfig = (api_config, lang) => dispatch => {
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

export const getPage = (api, type, lang, url, query) => dispatch => {
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
  if (axios_endpoint) {
    return axios.get(api.url + '/' + axios_endpoint)
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

/* --------------------- GLOBAL VARIABLES 
load all global data
- menu links
- features
- translation

set global user variant code from 
click choise attributes on product page etc
*/

export const get_global_variables = (api, lang) => dispatch => {
  const page_url = '?lang=' + lang;
  const axios_endpoint = api.product + page_url;
  return axios.get(api.url + '/' + axios_endpoint)
    .then(res =>
      dispatch({
        type: action_types.GET_GLOBAL_VARIABLES,
        payload: res.data
      })
    )
    .catch(err => {
      console.error('❌ Error get product', err);
    });
}

/*export const set_variant_code = (code, feat_id, default_variation, default_variation_id, variations, query, link_id) => dispatch => {
  if (default_variation) {
    const search = query ? query.substr(1) : null;
    let variantCode = null;
    let variantId = link_id;
    if (search && variations) {
      const queryVariation = variations.filter(variation => variation.id == search);
      variantCode = queryVariation[0] ? queryVariation[0].variation_code : null;
      variantId = queryVariation[0] ? queryVariation[0].id : null;
    }
    // const dispach_variant = default_variation; //variantCode ? variantCode : default_variation;
    const dispach_variant = variantCode ? variantCode : default_variation;
    dispatch({
      type: action_types.SET_VARIANT_CODE,
      payload: {
        code: code,
        feat_id: feat_id,
        default_variant: dispach_variant,
        default_variation_id: default_variation_id,
        search: search,
        variant_id: variantId,
      }
    });
  }
}
*/


/*** ----------------------- USER
 * 
 * currencies
 * language etc
 */

export const setUserCurrency = (currency_code, all_currencies) => dispatch => {
  if (all_currencies[currency_code]) {
    dispatch(userActions.setUserCurrency(currency_code));
  }
}