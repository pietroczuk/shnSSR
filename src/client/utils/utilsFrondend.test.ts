import { it, expect } from 'vitest';
import { getPageTypeAsString } from './utilsFrondend';

it('it should return pageType as string', () => {
    const result = getPageTypeAsString('productPage');
    expect(result).toBe('product');
});