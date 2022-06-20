import { it, expect } from 'vitest';
import { getPageTypeAsString } from './utilsFrondend';

it('it should return pageType as string', () => {
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