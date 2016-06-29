/**
 * @param {Array} tuples an array of object pairs of the form
 *  [{key: 'abc', value: 3}, {key: 'cdf', value: 5}]
 *
 * @returns {Object} an object of the form {abc: 3, cdf: 5}
 */
export function tuplesToObject(tuples) {
  const result = {};
  for (const [key, val] of tuples.entries()) {
    result[key] = val;
  }

  return result;
}
