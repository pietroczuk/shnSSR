import { Dispatch } from "@reduxjs/toolkit";
import { displayActions } from "../../slices/displaySlice/displaySlice";

export const setProductVisual = (cookieKey: string) => (dispatch: Dispatch) => {
    dispatch(displayActions.setProductVisual(cookieKey));
}
export const setProductRandomColors = (cookieKey: string, randomValue?: boolean) => (dispatch: Dispatch) => {
    dispatch(displayActions.setProductRandomColors({ cookieKey: cookieKey, randomValue: randomValue }));
}