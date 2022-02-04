import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { pageTypes } from "../../../utils/utilsFrondend";
import { Variations } from "../../Models/Product/Variations/Variations.model";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { pageActions } from "../../slices/pageSlice/pageSlice";

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
        dispatch(pageActions.setPageData({ data: res.data, query: query, pageType: type }))
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