import { Dispatch } from "@reduxjs/toolkit";
import { publicConfigActions } from "../../slices/publicConfigSlice/publicConfigSlice";

export const setGlobalDefaultVariantcode = (featureKey: string, value: object) => (dispatch: Dispatch) => {
    /**
     * todo: check if feature key exist and attrib id in public config data
     */
    if (featureKey && value) {
      dispatch(publicConfigActions.setSelectedVariantCode({ key: featureKey, val: value }));
    }
  }