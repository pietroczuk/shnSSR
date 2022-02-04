import { Dispatch } from "@reduxjs/toolkit";
import { AllCurrencies } from "../../Models/SystemConfig/AllCurrencies/AllCurrencies.model";
import { userActions } from "../../slices/userSlice/userSlice";

export const setUserCurrency = (currencyCode: string, allCurrencies: AllCurrencies, cookieCurrencyKey: string) => (dispatch: Dispatch) => {
    if (allCurrencies[currencyCode]) {
        const actionPayload = { currencyCode, cookieCurrencyKey };
        dispatch(userActions.setUserCurrency(actionPayload));
    }
}