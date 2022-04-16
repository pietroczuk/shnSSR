export interface Delivery {
    globalMinPrice: {
        [key: string]: string
    };
    countryMinPrice: {
        [key: string]: {
            [key: string]: string
        }
    }
}