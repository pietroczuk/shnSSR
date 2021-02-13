import axios from 'axios';
import config from '../../utils/config';

import { action_types } from './action_types';

const { api } = config;
const apiUrl = api.url;

const show_error_message = msg => {
  console.log(msg);
}

export const get_global_feat = () => dispatch => {
  return axios.get(apiUrl + api.feat)
    .then(res =>
      dispatch({
        type: action_types.GET_GLOBAL_FEAT_TYPE,
        payload: res,
      })
    )
    .catch(err => {
      show_error_message(err);
    });
}