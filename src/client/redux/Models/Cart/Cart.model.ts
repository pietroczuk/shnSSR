import { CartProducts } from "./CartProducts/CartProducts.model";

export interface Cart {
    length: number;
    products?: CartProducts 
}