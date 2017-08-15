import getDateKey from './getDateKey';
/**
 * @bit
 * @name convertDateToDateKey
 * @description Returns the string representation for a provided date.
 * @param date {date} - a valid date
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 *
 */

const convertDateToDateKey = (date) => (
  getDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate())
);

export default convertDateToDateKey;