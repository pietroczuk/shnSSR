import { it, expect, describe } from 'vitest';
import { getPageTypeAsString } from './utilsFrondend';

describe('getPageTypeAsString()', ()=> {
    it('it should return correct pageType as string', () => {
        const inputString = 'productPage';
        const expectedResult = 'product';
    
        const result = getPageTypeAsString(inputString);
        expect(result).toBe(expectedResult);
    });
    it('it should return wrong pageType as undefined', () => {
        const inputString = 'productPage2';
        const inputString2 = '';
    
        const result = getPageTypeAsString(inputString);
        const result2 = getPageTypeAsString(inputString2);
        expect(result).toBeUndefined();
        expect(result2).toBeUndefined();
    });
    
    // it('it should not throw a error if no value is passed into the function', () => {
    //     const resultFn = () => {
    //         getPageTypeAsString();
    //     }
    //     expect(resultFn).not.toThrow();
    // });
})