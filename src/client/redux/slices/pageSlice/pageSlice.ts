import { createSlice } from '@reduxjs/toolkit';
import { Page } from '../../Models/Page/Page.model';

import { pageInitialState } from './pageInitialState';

const pageSlice = createSlice({
    name: 'Page',
    initialState: pageInitialState,
    reducers: {
        setPageData(_state: Page, action) {
            const { data, query } = action.payload;
            if (query && data.data.variations[query]) {
                data.data.current_variation_id = query;
            }
            return data;
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