/**
 * @bit
 * @name isArrayLike
 * @description Returns true if the provided object is an iterable, except for strings for which it will return false.
 * @param {object} obj - object to be inspected
 */

export default function isArrayLike(obj) {
    if (Array.isArray(obj)) return true;
    if (typeof obj === 'string') return false;
    const length = obj.length;
    return typeof length === 'number' && length >= 0;
  }