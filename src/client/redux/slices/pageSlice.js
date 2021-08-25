import { createSlice } from '@reduxjs/toolkit';
import { clear_page } from '../actions/all_actions';

const pageSlice = createSlice({
    name: 'Page',
    initialState: {},
    reducers: {
        setPageData(state, action) {
            const { data, query } = action.payload;
            if (query && data.data.variations[query]) {
                data.data.current_variation_id = query;
                state = data;
            }
        },
        clearPageData(state) {
            state = {}
        },
        setProductCurrentVariantId(state, action) {
            state.data.current_variation_id = action.payload;
        }
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;