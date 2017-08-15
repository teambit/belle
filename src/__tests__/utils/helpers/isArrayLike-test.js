import { expect } from 'chai';

import isArrayLike from '../../../utils/helpers/isArrayLike';

describe('isArrayLike method', () => {
  it('should return true for array', () => {
    expect(isArrayLike([123, 'abc', () => ({}), undefined])).to.be.true;
  });

  it('should return false for non-arrays', () => {
    expect(isArrayLike(123)).to.be.false;
    expect(isArrayLike('abc')).to.be.false;
  });
});