/**
 * @bit
 * @name size
 * @description Return the number of values in the list.
 * @param {array} iterable - must be an iterable object
 */

export default function size(iterable) {
    if (iterable) {
      return iterable.length;
    }
  
    return 0;
  }