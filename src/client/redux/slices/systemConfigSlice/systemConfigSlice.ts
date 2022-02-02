import { createSlice } from '@reduxjs/toolkit';
import { SystemConfig } from '../../Models/SystemConfig/SystemConfig.type';
import { SystemConfigInitialState } from './systemConfigInitialState';

type Action = {
    payload: SystemConfig
}

const systemConfigSlice = createSlice({
    name: 'SystemConfig',
    initialState: SystemConfigInitialState,
    reducers: {
        // setSystemConfig(state:SystemConfig, action: {payload: any}) {
        setSystemConfig(_state: SystemConfig, action: Action) {
            return action.payload;
        }
    }
});
export const systemConfigActions = systemConfigSlice.actions;
export default systemConfigSlice;