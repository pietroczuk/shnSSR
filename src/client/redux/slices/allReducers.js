import systemConfigSlice from './systemConfigSlice';
import publicConfigSlice from './publicConfigSlice';
import pageSlice from './pageSlice';
import userSlice from './userSlice';

const allReducers = {
    SystemConfig: systemConfigSlice.reducer,
    PublicConfig: publicConfigSlice.reducer,
    Page: pageSlice.reducer,
    User: userSlice.reducer,
}

export default allReducers;