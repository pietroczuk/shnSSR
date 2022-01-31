import { createSlice } from '@reduxjs/toolkit';
import { Page } from '../../types/page.types';
import { PageInitialState } from './pageInitialState';

const pageSlice = createSlice({
    name: 'Page',
    initialState: PageInitialState,
    reducers: {
        setPageData(_state: Page, action) {
            const { data, query } = action.payload;
            if (query && data.data.variations[query]) {
                data.data.current_variation_id = query;
            }
            return data;
        },
        clearPageData() {
            return PageInitialState;
        },
        setProductCurrentVariantId(state: Page, action) {
            state.data.current_variation_id = action.payload;
            return state;
        }
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;