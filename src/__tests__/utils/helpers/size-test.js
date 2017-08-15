import { expect } from 'chai';

import size from '../../../utils/helpers/size';

describe('size method', () => {
  it('should return size of an array', () => {
    expect(size([1, 2, 3])).to.equal(3);
  });

  it('should return string length for strings', () => {
    expect(size('abc')).to.equal(3);
  });

  it('should not break for empty array', () => {
    expect(size(undefined)).to.equal(0);
    expect(size(null)).to.equal(0);
    expect(size([])).to.equal(0);
  });
});