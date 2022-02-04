import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { SystemConfig } from "../../Models/SystemConfig/SystemConfig.type";
import { publicConfigActions } from "../../slices/publicConfigSlice/publicConfigSlice";
import { systemConfigActions } from "../../slices/systemConfigSlice/systemConfigSlice";

export const getGlobalConfig = (api_config: SystemConfig, lang: string) => async (dispatch: Dispatch) => {
    dispatch(systemConfigActions.setSystemConfig(api_config));
    const page_url = '?lang=' + lang;
    const axios_endpoint = api_config.api.global + page_url;
    return axios.get(api_config.api.url + '/' + axios_endpoint)
        .then(res =>
            dispatch(publicConfigActions.setPublicConfig(res.data))
        )
        .catch(err => {
            console.error('❌ Error get global variables', err);
        });
}