export interface Delivery {
    globalMinPrice: {
        [key: string]: number
    };
    countryMinPrice: {
        [key: string]: {
            [key: string]: number
        }
    }
}