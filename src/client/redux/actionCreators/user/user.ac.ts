import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage, isObjectEmpty } from "../../../utils/utilsFrondend";
// import { ProductKeyVal } from "../../Models/Product/Product.model";
// import { Product } from "../../Models/Product/Product.model";
import { AllCurrencies } from "../../Models/SystemConfig/AllCurrencies/AllCurrencies.model";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { userActions } from "../../slices/userSlice/userSlice";

export const setUserCurrency = (currencyCode: string, allCurrencies: AllCurrencies, cookieCurrencyKey: string) => (dispatch: Dispatch) => {
    if (allCurrencies[currencyCode]) {
        const actionPayload = { currencyCode, cookieCurrencyKey };
        dispatch(userActions.setUserCurrency(actionPayload));
    }
}

// export const addToVisitedProduct = (productId: string, product: Product) => (dispatch: Dispatch) => {
//     if (productId && product) {
//         const actionPayload = { productId, product };
//         dispatch(userActions.addToVisitedProduct(actionPayload));
//     }
// }

export const addToStoreVisited = (api: Api, lang: string, productId: string, localstorageVisistedKey: string) => (dispatch: Dispatch) => {
    
    

    const page_url = '?lang=' + lang + '&product=' + productId;
    const axios_endpoint = api.visited + page_url;
    return axios.get(api.url + '/' + axios_endpoint)
        .then(res => {
            const productData = {
                ...res.data.data
            };
            if (!isObjectEmpty(productData)) {
                return dispatch(userActions.addToVisitedProduct({ product: productData, productId, localstorageVisistedKey }))
            }
            return null;
        }
        )
        .catch(err => {
            console.error('❌ Error get data from DB', err);
        });

}



/**
 * Init wishlist, and check actual wishlist
 * Get wishlist from localstorage  
 */

 export const checkVisitedProducts = (localstorageVisistedKey: string, api: Api, language: string) => (_dispatch: Dispatch) => {
    const localstorageData = localstorageVisistedKey ? getLocalStorage(localstorageVisistedKey) : null;
    const visitedData: Array<string> = localstorageData ? localstorageData : null;
    console.log('localst', visitedData)
    if (visitedData) {
    //   const wishlistProducts: WishlistProducts = {};
      Promise.all(visitedData.map(
        productId => {
        //   const variantId = val.v;
        //   const productId = val.p;
          const page_url = '?lang=' + language + '&product=' + productId;
          const axios_endpoint = api.visited + page_url;
          return axios.get(api.url + '/' + axios_endpoint)
            .then(res => {
              return {
                responseData: res
              }
            })
            .catch(e => {
              console.error('❌ Error get data from DB', e);
            });
        }
      )).then(res => {
          console.log('res',res);
        // res.forEach((r: any) => {
        //   if (r.responseData.status == 200 && !isObjectEmpty(r.responseData.data.data)) {
        //     wishlistProducts[r.variantId] = {
        //       p: r.responseData.data.info.id,
        //       v: r.variantId,
        //       productData: {
        //         ...r.responseData.data.info,
        //         ...r.responseData.data.data
        //       }
        //     };
        //   }
        // })
        // dispatch(wishlistActions.updateWishlist(wishlistProducts));
      }).catch(e => {
        console.error('❌ Error: get multiple wishlist products data from DB', e);
      });
    }
  }