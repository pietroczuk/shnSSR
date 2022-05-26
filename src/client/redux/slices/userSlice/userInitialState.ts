import { User } from "../../Models/User/User.model";

export const UserInitialState: User = {
    language: '',
    currency: '',
    today: { 
        date: new Date().setMilliseconds(0)
    },
    visited: {
        products: {},
        isLoaded: false,
    }
}