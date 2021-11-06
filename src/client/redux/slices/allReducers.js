import systemConfigSlice from './systemConfigSlice';
import publicConfigSlice from './publicConfigSlice';
import pageSlice from './pageSlice';
import userSlice from './userSlice';
import displaySlice from './displaySlice';
import wishlistSlice from './wishlistSlice';

/**
 * @typedef {Object}
 * 
 */

const allReducers = {
    SystemConfig: systemConfigSlice.reducer,
    PublicConfig: publicConfigSlice.reducer,
    Page: pageSlice.reducer,
    User: userSlice.reducer,
    Display: displaySlice.reducer,
    Wishlist: wishlistSlice.reducer,
}

export default allReducers;