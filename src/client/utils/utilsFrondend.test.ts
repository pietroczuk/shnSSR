import { it, expect } from 'vitest';
import { getPageTypeAsString } from './utilsFrondend';

it('it should return correct pageType as string', () => {
    const inputString = 'productPage';
    const expectedResult = 'product';

    const result = getPageTypeAsString(inputString);
    expect(result).toBe(expectedResult);
});
it('it should return wrong pageType as undefined', () => {
    const inputString = 'productPage2';

    const result = getPageTypeAsString(inputString);
    expect(result).toBeUndefined;
});
it('it should return empty pageType as undefined', () => {
    const inputString = '';

    const result = getPageTypeAsString(inputString);
    expect(result).toBeUndefined;
});
it('it should throw a error if no value is passed into the function', () => {
    const resultFn = () => {
        getPageTypeAsString();
    }
    expect(resultFn).toThrow;
});