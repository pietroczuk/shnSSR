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
export const getGlobalConfig = (api_config, lang) => async dispatch => {
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