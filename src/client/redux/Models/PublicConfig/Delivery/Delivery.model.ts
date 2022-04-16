export interface Delivery {
    globalMinPrice: {
        [key: string]: number
    };
    countryMinPrice: {
        [key: string]: {
            [key: string]: number
        }
    },
    countries: {
        [key: string]: {
            code: string,
            days: number,
            title: string
        } | null;
    }
}