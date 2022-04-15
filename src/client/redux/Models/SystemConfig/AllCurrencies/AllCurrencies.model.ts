export interface AllCurrencies {
    [key: string]: {
        code: string;
        label: string;
        sign: string;
        isDisplayLeft: boolean;
        default: boolean;
    }
}