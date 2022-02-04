import { Dispatch } from "@reduxjs/toolkit";
import { Cart } from "../../Models/Cart/Cart.model";
import { Api } from "../../Models/SystemConfig/Api/Api.model";
import { cartActions } from "../../slices/cartSlice/cartSlice";


export const addToStoreCart = () => (dispatch: Dispatch) => {
    dispatch(cartActions.addToCart({}));
}

export const checkCart = (_initLocalstorageCartKey: string, _cartState: Cart, _api: Api, _language: string) => (dispatch: Dispatch) => {
    
    dispatch(cartActions.updateCart({}));
}