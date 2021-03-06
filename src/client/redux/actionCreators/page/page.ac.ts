import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { pageTypes, similarProductTypes } from "../../../utils/utilsFrondend";
import { Variations } from "../../Models/Product/Variations/Variations.model";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { pageActions } from "../../slices/pageSlice/pageSlice";

export const getPage = (api: Api, type: string, lang: string, url: string, query: string, axiosAbortController?: AbortController) => async (dispatch: Dispatch) => {
  const page_url = '?url=' + url + '&lang=' + lang;
  let axiosEndpoint = null;
  switch (type) {
    case pageTypes.productPage:
      axiosEndpoint = api.product + page_url;
      break;
    case pageTypes.staticPage:
      axiosEndpoint = api.page + page_url;
      break;
    case pageTypes.categoryPage:
      axiosEndpoint = api.category + page_url;
      break;
  }
  // console.log(axios_endpoint);
  if (axiosEndpoint) {
    return axios.get(api.url + '/' + axiosEndpoint,
      { signal: axiosAbortController ? axiosAbortController.signal : undefined })
      .then(res =>
        dispatch(pageActions.setPageData({ data: res.data, query: query, pageType: type }))
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  }
  return undefined;
}

export const setProductCurrVarId = (productVariantId: string, variations: Variations) => (dispatch: Dispatch) => {
  if (productVariantId && variations[productVariantId]) {
    dispatch(pageActions.setProductCurrentVariantId(productVariantId))
  }
}

export const updateStorePageProductslistPromoPrice = (productId: string, saleEnable: boolean) => (dispatch: Dispatch) => {
  const actionPayload = { productId, saleEnable };
  return dispatch(pageActions.updateCategoryProductsPromoPrice(actionPayload));
}

export const updateStorePageSingleProductPromoPrice = (saleEnable: boolean) => (dispatch: Dispatch) => {
  const actionPayload = { saleEnable };
  return dispatch(pageActions.updateSingleProductPromoPrice(actionPayload));
}
/**
 * get similar products
 */

export const getSimilarProducts = (api: Api, type: keyof typeof similarProductTypes, lang: string, product: string, limit: number, collectionId: string | null,  axiosAbortController?: AbortController) => async (dispatch: Dispatch) => {
  let page_url = '';
  let axiosEndpoint = null;
  switch (type) {
    case similarProductTypes.category:
      page_url = '?lang=' + lang + '&product=' + product + '&limit=' + limit;
      axiosEndpoint = api.similarCategoryProducts + page_url;
      break;
    case similarProductTypes.collection:
      page_url = '?lang=' + lang + '&product=' + product + '&collection=' + collectionId + '&limit=' + limit;
      axiosEndpoint = api.similarCollectionProducts + page_url;     
      break;
  }
  if (axiosEndpoint) {
    return axios.get(api.url + '/' + axiosEndpoint,
      { signal: axiosAbortController ? axiosAbortController.signal : undefined })
      .then(res =>
        dispatch(pageActions.setSimilarProduct({ data: res.data.data, type: type }))
      )
      .catch(err => {
        console.error('❌ Error get data from DB', err);
      });
  }
  return undefined;
}