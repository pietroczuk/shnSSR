import { createSlice } from '@reduxjs/toolkit';
// import { AxiosAbortController } from '../actions/actionCreators';

const pageSlice = createSlice({
    name: 'Page',
    initialState: {},
    reducers: {
        setPageData(state, action) {
            const { data, query } = action.payload;
            if (query && data.data.variations[query]) {
                data.data.current_variation_id = query;
            }
            return data;
        },
        clearPageData() {
            return {}
        },
        setProductCurrentVariantId(state, action) {
            state.data.current_variation_id = action.payload;
            return state;
        }
    }
});
export const pageActions = pageSlice.actions;
export default pageSlice;