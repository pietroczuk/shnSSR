import { createSlice } from '@reduxjs/toolkit';
import { pageTypes, similarProductTypes } from '../../../utils/utilsFrondend';
import { Page } from '../../Models/Page/Page.model';

import { pageInitialState } from './pageInitialState';

const pageSlice = createSlice({
    name: 'Page',
    initialState: pageInitialState,
    reducers: {
        setPageData(state: Page, action) {
            const { data, query, pageType } = action.payload;

            switch (pageType) {
                case pageTypes.productPage:
                    state.data.productPage = data.data;
                    break;
                case pageTypes.staticPage:
                    state.data.staticPage = data.data;
                    break;
                case pageTypes.categoryPage:
                    state.data.categoryPage = data.data;
                    break;
                // case pageTypes.wishlist:
                //     state.data.staticPage = data.data;
                //     break;
            }
            state.info = data.info;
            if (query && data.data.variations[query]) {
                state.data.productPage.currentVariationId = query;
            }
            return state;
        },
        clearPageData() {
            return pageInitialState;
        },
        setProductCurrentVariantId(state: Page, action) {
            state.data.productPage.currentVariationId = action.payload;
            return state;
        },
        updateCategoryProductsPromoPrice(state: Page, action) {
            const { productId, saleEnable } = action.payload;
            const { saveMoney, salePrice, minPrice, sale, variations } = state.data.categoryPage.products[productId];
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

            // console.log('product update',action.payload);
            return state;
        },
        updateSingleProductPromoPrice(state: Page, action) {
            const { saleEnable } = action.payload;
            const { sale, variations } = state.data.productPage;
            // const productData = state.products[variantId].productData;
            const { percent } = sale;
            if (!saleEnable) {
                // Object.entries(salePrice).forEach(([key, _value]) => {
                //     salePrice[key] = 0;
                // });
                // Object.entries(saveMoney).forEach(([key, _value]) => {
                //     saveMoney[key] = 0;
                // });
                Object.entries(variations).forEach(([_key, value]) => {
                    Object.entries(value.salePrice).forEach(([key, _saleValue]) => {
                        value.salePrice[key] = 0;
                    });
                    Object.entries(value.saveMoney).forEach(([key, _saleValue]) => {
                        value.saveMoney[key] = 0;
                    });
                });

            } else {
                // Object.entries(salePrice).forEach(([key, _value]) => {
                //     salePrice[key] = Math.round(minPrice[key] * ((100 - percent) / 100));
                // });
                // Object.entries(saveMoney).forEach(([key, _value]) => {
                //     saveMoney[key] = minPrice[key] - salePrice[key];
                // });

                Object.entries(variations).forEach(([_key, value]) => {
                    Object.entries(value.salePrice).forEach(([key, _saleValue]) => {
                        value.salePrice[key] = Math.round(value.variationPrice[key] * ((100 - percent) / 100));
                    });
                    Object.entries(value.saveMoney).forEach(([key, _saleValue]) => {
                        value.saveMoney[key] = value.variationPrice[key] - value.salePrice[key];
                    });
                });
            }

            // console.log('product update',action.payload);
            return state;
        },
        setSimilarProduct(state: Page, action) {
            const { data, type } = action.payload;
            switch (type) {
                case similarProductTypes.category:
                    state.data.productPage.similarCategory = data;
                    break;
                case similarProductTypes.collection:
                    state.data.productPage.similarCollection = data;
                    break;
            }
            return state;
        },
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;