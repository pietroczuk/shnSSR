import systemConfigSlice from './systemConfigSlice';
import publicConfigSlice from './publicConfigSlice';
import pageSlice from './pageSlice';
import userSlice from './userSlice';

/**
 * @typedef {Object}
 * 
 */

const allReducers = {
    SystemConfig: systemConfigSlice.reducer,
    PublicConfig: publicConfigSlice.reducer,
    Page: pageSlice.reducer,
    User: userSlice.reducer,
}

export default allReducers;