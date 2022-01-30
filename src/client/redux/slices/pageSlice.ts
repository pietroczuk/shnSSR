import { createSlice } from '@reduxjs/toolkit';
import { Page_Data } from '../types/page.types';

interface Page {
    type: string,
    data: Page_Data
}

const initialState : Page = {
    type : '',
    data: {}
}

const pageSlice = createSlice({
    name: 'Page',
    initialState,
    reducers: {
        setPageData(state, action) {
            const { data, query } = action.payload;
            if (query && data.data.variations[query]) {
                data.data.current_variation_id = query;
            }
            return state = data;
        },
        clearPageData() {
            return initialState;
        },
        setProductCurrentVariantId(state, action) {
            state.data.current_variation_id = action.payload;
            return state;
        }
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;