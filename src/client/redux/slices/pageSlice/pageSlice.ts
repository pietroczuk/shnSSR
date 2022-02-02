import { createSlice } from '@reduxjs/toolkit';
import { pageTypes } from '../../../utils/utilsFrondend';
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
                state.data.productPage.current_variation_id = query;
            }
            return state;
        },
        clearPageData() {
            return pageInitialState;
        },
        setProductCurrentVariantId(state: Page, action) {
            state.data.productPage.current_variation_id = action.payload;
            return state;
        }
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;