import systemConfigSlice from './systemConfigSlice/systemConfigSlice';
import publicConfigSlice from './publicConfigSlice/publicConfigSlice';
import userSlice from './userSlice/userSlice';
import displaySlice from './displaySlice/displaySlice';
import wishlistSlice from './wishlistSlice/wishlistSlice';
import pageSlice from './pageSlice/pageSlice';

const allReducers = {
    SystemConfig: systemConfigSlice.reducer,
    PublicConfig: publicConfigSlice.reducer,
    Page: pageSlice.reducer,
    User: userSlice.reducer,
    Display: displaySlice.reducer,
    Wishlist: wishlistSlice.reducer,
}

export default allReducers;