import React from 'react';
import getArrayForReactChildren from './getArrayForReactChildren';
import isEmpty from './isEmpty';
import flatten from './flatten';

/**
 * @bit
 * @name flattenReactChildren
 * @description Helper method for Belle components.
 */

export default function flattenReactChildren(children) {
  if (!isEmpty(children)) {
    if (Array.isArray(children)) {
      return flatten(children);
    }

    return getArrayForReactChildren(children);
  }

  return undefined;
}